import os
from pymongo import MongoClient
from dotenv import load_dotenv
import openai
import io

load_dotenv()
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.abspath(os.path.dirname(__file__))}/app.db")
MONGO_URI = os.environ.get("MONGO", '')
client = MongoClient(MONGO_URI)
db = client.Test

OPENAI_WHISPER_API_KEY = os.environ.get("OPENAI_WHISPER_API_KEY")
openai.api_key = OPENAI_WHISPER_API_KEY


class CustomAudioFile:
    def __init__(self, data, name):
        self.data = data
        self.name = name
        print("CustomAudioFile - data type:", type(self.data))
        print("CustomAudioFile - initial bytes:", self.data[:100])  # Printing initial bytes

    def read(self):
        return self.data

    def __len__(self):
        return len(self.data)


def transcribe_audio(audio_data_bytes):
    try:
        print("Type of audio_data_bytes:", type(audio_data_bytes))

        # Save the audio data for manual inspection
        with open("debug_audio.mp3", "wb") as f:
            f.write(audio_data_bytes)
        
        model_id = 'whisper-1'

        # Pass the bytes data directly to the transcribe method
        transcription = openai.Audio.transcribe(
            model=model_id,
            file=CustomAudioFile(audio_data_bytes, "temp_audio.mp3"),
            content_type='audio/mp3',
            response_format='json'
        )
        
        print("Transcription result:", transcription)

        if transcription.get("error"):
            print(f"OpenAI Error: {transcription['error']['message']}")
            return None

        return transcription['text']
    except Exception as e:
        print(f"Error during transcription: {str(e)}")
        return None
