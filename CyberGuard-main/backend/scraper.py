import requests
from bs4 import BeautifulSoup
import re
import time
from config import *
from pymongo import MongoClient
from datetime import datetime

PASTE_SITES = ['pastebin.com', 'pastespot.com', 'cl1p.net', 'dpaste.org', 'slexy.org',
               'dumpz.org', 'hastebin.com', 'gist.github.com', 'heypasteit.com', 'ivpaste.com',
               'mysticpaste.com', 'paste2.org']

EMAIL_REGEX = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
PHONE_REGEX = r'\b(?:\+91[-\s]?)?[6-9]\d{9}\b'
CREDIT_CARD_REGEX = r'\b(?:\d[ -]*?){13,16}\b'

HEADERS = {"User-Agent": "Mozilla/5.0"}

BASE_QUERIES = [
    "Indian datasets",
    "Indian leaked data",
    "India email leaks",
    "Indian phone numbers leak",
    "Indian credit card leaks",
]

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

def duckduckgo_search(query, max_results=20):
    url = "https://html.duckduckgo.com/html/"
    try:
        resp = requests.post(url, headers=HEADERS, data={'q': query}, timeout=10)
        soup = BeautifulSoup(resp.text, "html.parser")
        links = []
        for a in soup.find_all('a', href=True):
            href = a['href']
            if 'uddg=' in href:
                real_url = href.split('uddg=')[1]
                real_url = requests.utils.unquote(real_url)
                links.append(real_url)
            if len(links) >= max_results:
                break
        return links
    except:
        return []

def filter_paste_links(links):
    return list(set([link for link in links if any(site in link for site in PASTE_SITES)]))

def fetch_paste_content(url):
    try:
        resp = requests.get(url, headers=HEADERS, timeout=10)
        return resp.text if resp.status_code == 200 else ""
    except:
        return ""

def extract_sensitive_data(text):
    return {
        "emails": list(set(re.findall(EMAIL_REGEX, text))),
        "phones": list(set(re.findall(PHONE_REGEX, text))),
        "credit_cards": list(set(re.findall(CREDIT_CARD_REGEX, text)))
    }

def run_scraper():
    for base_query in BASE_QUERIES:
        for site in PASTE_SITES:
            query = f"{base_query} site:{site}"
            links = duckduckgo_search(query)
            paste_links = filter_paste_links(links)

            for url in paste_links:
                content = fetch_paste_content(url)
                if content:
                    data = extract_sensitive_data(content)
                    if any(data.values()):
                        if not collection.find_one({"url": url}):
                            document = {
                                "query": base_query,
                                "url": url,
                                "data": data,
                                "timestamp": datetime.utcnow()
                            }
                            collection.insert_one(document)
                time.sleep(2)
