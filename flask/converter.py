import sys
from pytube import YouTube
import os

# Get the URL from command-line arguments
url = sys.argv[1]

# url input from user
yt = YouTube(url)

# extract only audio
video = yt.streams.filter(only_audio=True).first()

# check for destination to save file
destination = str()

# download the file
out_file = video.download(output_path=destination)

# save the file
base, ext = os.path.splitext(out_file)
new_file = base + '.mp3'
os.rename(out_file, new_file)
