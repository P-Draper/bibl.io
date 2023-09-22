import sys
from pytube import YouTube
import io
import magic
from pydub import AudioSegment
import tempfile
import subprocess


def detect_audio_format(data):
    mime = magic.Magic()
    audio_format = mime.from_buffer(data)
    return audio_format

try:
    url = sys.argv[1]
    yt = YouTube(url)
    video = yt.streams.filter(only_audio=True).first()
    audio_buffer = io.BytesIO()
    video.stream_to_buffer(audio_buffer)
    audio_data = audio_buffer.getvalue()
    sys.stderr.write(f"Length of the audio data before conversion: {len(audio_data)}")
    detected_format = detect_audio_format(audio_data)
    sys.stderr.write(f"The detected audio format is: {detected_format}")

    if not detected_format.startswith("audio/mpeg"):
        sys.stderr.write("Converting to MP3...\n")
        stream_url = video.url  
        subprocess.run(["ffmpeg", "-i", stream_url, "-f", "mp3", "-ab", "192k", "-ar", "44100", "-vn", "output.mp3"])
        with open("output.mp3", "rb") as mp3_file:
            audio_data = mp3_file.read()
        subprocess.run(["rm", "output.mp3"])
        sys.stderr.write("Conversion to MP3 successful\n")

    detected_format_after_conversion = detect_audio_format(audio_data)
    sys.stderr.write(f"The detected audio format after potential conversion is: {detected_format_after_conversion}")

    sys.stdout.buffer.write(audio_data) 

except Exception as e:
    sys.stderr.write(f"An error occurred in converter.py: {str(e)}\n")