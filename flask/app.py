from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify, session
import os
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv
from subprocess import run
from pytube import YouTube
from pymongo.cursor import CursorType
from mongo import MongoHandler, FileHandler
from gridfs import GridFS
import io 
from transcription import transcribe_audio
from translation import translate_audio
import openai
import tempfile
import json
from datetime import datetime

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
app.secret_key = os.environ.get("SECRET_KEY", "your-secret-key")

MONGO_URI = os.environ.get("MONGO", '')
client = MongoClient(MONGO_URI)
db = client.Test
fs = GridFS(db)
temp_dir = tempfile.gettempdir()  # Get the system's temporary directory
temp_audio_path = os.path.join(temp_dir, "temp_audio.wav")


def transcribe_and_upload_audio(mp3_data, current_url):
    try:
        mp3_data_io = io.BytesIO(mp3_data)
        transcription = transcribe_audio(mp3_data)
        translation = translate_audio(mp3_data)
        
        mp3_file_name = current_url + '.mp3'  
        with fs.new_file(filename=mp3_file_name, content_type='audio/mp3') as mp3_file:
            mp3_file.write(mp3_data)

        if transcription:
            # Save transcription to db.transcription
            transcription_collection = db.transcriptions
            transcription_collection.insert_one({
                'text': transcription,
                'createdAt': datetime.utcnow() 
            })

        if translation:
            # Save translation to db.translation
            translation_collection = db.translations
            translation_collection.insert_one({
                'text': translation,
                'createdAt': datetime.utcnow() 
            })

        return {"transcription_result": transcription, "translation_result": translation}, 200

    except openai.error.OpenAIError as e:
        return {"error": f"OpenAI error: {str(e)}"}, 500
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}, 500



@app.route('/getMostRecentUrl', methods=['GET'])
def get_most_recent_url():
    try:
        collection = db.urls
        most_recent_url = collection.find_one({}, sort=[('createdAt', -1)])

        if most_recent_url:
            most_recent_url['_id'] = str(most_recent_url['_id'])
            current_url = most_recent_url['Url']
            result = run(["python", "converter.py", current_url], capture_output=True, text=False)
            mp3_data = result.stdout
            converter_errors = result.stderr
            if mp3_data:
                transcription_result, status_code = transcribe_and_upload_audio(mp3_data, current_url)
                return jsonify(transcription_result), status_code
            else:
                return jsonify({"error": "Error converting URL to MP3"}), 500
        else:
            return jsonify({"error": "No data found"}), 404
    except UnicodeDecodeError as ude:
        return jsonify({"error": "Unicode decoding issue"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/getCurrentUrl', methods=['GET'])
def get_current_url():
    try:
        collection = db.urls
        most_recent_url = collection.find_one({}, sort=[('createdAt', -1)])

        if most_recent_url:
            most_recent_url['_id'] = str(most_recent_url['_id'])
            current_url = most_recent_url['Url']
            return jsonify({"current_url": current_url}), 200
        else:
            return jsonify({"error": "No current URL available"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5555, debug=True)
