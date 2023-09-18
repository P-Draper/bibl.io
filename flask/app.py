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
import openai
import tempfile

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "your-secret-key")

MONGO_URI = os.environ.get("MONGO", '')
client = MongoClient(MONGO_URI)
db = client.Test
fs = GridFS(db)
temp_dir = tempfile.gettempdir()  # Get the system's temporary directory
temp_audio_path = os.path.join(temp_dir, "temp_audio.wav")


def transcribe_and_upload_audio(mp3_data, current_url):
    try:
        mp3_data_io = io.BytesIO(mp3_data)  # Use the bytes data directly

        # Add a print statement to verify the length of mp3_data
        print("Length of mp3_data:", len(mp3_data))
        print("Type of mp3_data:", type(mp3_data))
        # Call the transcribe_audio function with the file-like object
        transcription = transcribe_audio(mp3_data)

        if transcription:
            # Upload the MP3 data to MongoDB using GridFS
            mp3_file_name = current_url + '.mp3'  

            # Open a GridFS file and write the MP3 data
            with fs.new_file(filename=mp3_file_name, content_type='audio/mp3') as mp3_file:
                mp3_file.write(mp3_data)

            return {"transcription_result": transcription}, 200
        else:
            return {"error": "Transcription failed"}, 500
    except openai.error.OpenAIError as e:
        return {"error": f"OpenAI error: {str(e)}"}, 500
    except Exception as e:
        # Add a print statement to see the error message
        print("Error in transcribe_and_upload_audio:", str(e))
        return {"error": f"An error occurred: {str(e)}"}, 500


@app.route('/getMostRecentUrl', methods=['GET'])
def get_most_recent_url():
    try:
        collection = db.urls
        most_recent_url = collection.find_one({}, sort=[('createdAt', -1)])

        if most_recent_url:
            most_recent_url['_id'] = str(most_recent_url['_id'])
            current_url = most_recent_url['Url']

            # Run converter.py to get the MP3 data as bytes
            result = run(["python", "converter.py", current_url], capture_output=True, text=False)
            mp3_data = result.stdout
            converter_errors = result.stderr
            print("Converter.py stderr:", converter_errors.decode('utf-8', 'ignore'))

            print("Length of captured mp3_data:", len(mp3_data))
            print("First 100 bytes of mp3_data:", mp3_data[:100])
            print("First 100 bytes of mp3_data:", mp3_data[:100])
            if mp3_data[:2] == b'\xFF\xFB':
                print("This looks like the start of an MP3 file!")
            else:
                print("This does NOT look like an MP3 file!")


            if mp3_data:
                transcription_result, status_code = transcribe_and_upload_audio(mp3_data, current_url)
                return jsonify(transcription_result), status_code
            else:
                return jsonify({"error": "Error converting URL to MP3"}), 500
        else:
            return jsonify({"error": "No data found"}), 404
    except UnicodeDecodeError as ude:
        print("A UnicodeDecodeError occurred:", str(ude))
        return jsonify({"error": "Unicode decoding issue"}), 500
    except Exception as e:
        print("Error in get_most_recent_url:", str(e))
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
