from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify, session
import os
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv
import logging
import subprocess
from subprocess import run
from pytube import YouTube
from pymongo.cursor import CursorType

load_dotenv()
logging.basicConfig(level=logging.DEBUG)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "your-secret-key")

MONGO_URI = os.environ.get("MONGO", '')
client = MongoClient(MONGO_URI)
db = client.Test

@app.route('/getMostRecentUrl', methods=['GET'])
def get_most_recent_url():
    try:
        collection = db.urls
        most_recent_url = collection.find_one({}, sort=[('createdAt', -1)])

        if most_recent_url:
            most_recent_url['_id'] = str(most_recent_url['_id'])
            current_url = most_recent_url['Url']
            logging.debug("Most Recent URL: %s", most_recent_url)
            run(["python", "converter.py", current_url])

            return jsonify(most_recent_url), 200
        else:
            logging.debug("No data found")
            return jsonify({"error": "No data found"}), 404
    except Exception as e:
        logging.error("Error: %s", str(e))
        return jsonify({"error": str(e)}), 500

@app.route('/getCurrentUrl', methods=['GET'])
def get_current_url():
    try:
        collection = db.urls
        most_recent_url = collection.find_one({}, sort=[('createdAt', -1)])

        if most_recent_url:
            most_recent_url['_id'] = str(most_recent_url['_id'])
            current_url = most_recent_url['Url']
            logging.debug("Most Recent URL: %s", most_recent_url)
            return jsonify({"current_url": current_url}), 200
        else:
            logging.debug("No data found")
            return jsonify({"error": "No current URL available"}), 404
    except Exception as e:
        logging.error("Error: %s", str(e))
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(port=5555, debug=True)
