from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from config import *
from scheduler import start_scheduler

app = Flask(__name__)
app.config["MONGO_URI"] = MONGO_URI + "/" + DB_NAME
mongo = PyMongo(app)

start_scheduler()

@app.route('/')
def home():
    return jsonify({"status": "Breach monitor running"}), 200

@app.route('/search', methods=['GET'])
def search_data():
    email = request.args.get('email')
    phone = request.args.get('phone')
    credit = request.args.get('credit_card')
    
    query = {"$or": []}
    if email:
        query["$or"].append({"data.emails": email})
    if phone:
        query["$or"].append({"data.phones": phone})
    if credit:
        query["$or"].append({"data.credit_cards": credit})

    if not query["$or"]:
        return jsonify({"error": "No search parameters provided"}), 400

    results = mongo.db[COLLECTION_NAME].find(query, {"_id": 0})
    return jsonify(list(results)), 200

if __name__ == "__main__":
    app.run(debug=True)
