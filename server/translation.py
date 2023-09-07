import os, openai
from os.path import join, dirname
from dotenv import load_dotenv

# Get API Key as Secret
dotenv_path = join(dirname(__file__), ".env")
load_dotenv(dotenv_path)

OPENAI_WHISPER_API_KEY = os.environ.get("OPENAI_WHISPER_API_KEY")

model_id = 'whisper-1'

media_file_path = 'audiofiles/400.mp3'
media_file = open(media_file_path, 'rb')

translation = openai.Audio.translate(
    api_key = OPENAI_WHISPER_API_KEY,
    model = model_id,
    file = media_file,
    response_format = 'text'
)
print(translation)