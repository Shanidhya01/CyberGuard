from apscheduler.schedulers.background import BackgroundScheduler
from scraper import run_scraper

def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(run_scraper, 'interval', days=7)
    scheduler.start()
