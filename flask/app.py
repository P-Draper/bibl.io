from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify
import os
from mongo import MongoHandler

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.json.compact = False

app.post('/convertUrl')
def convertUrl():
    """
    POST request to perform audio conversion from client-served data.
    Processes goes like so:

    1.  Client receives URL from user input for high-level translation.
            Data passed from client to Server Layer #1: MongoDB.
    2.  MongoDB receives URL from client for storage and translation.
            Data passed from Server Layer #1: MongoDB to Server Layer #2: Flask.
    3.  Flask receives URL from MongoDB for algorithmic conversion. 
        (***THIS IS WHERE WE ARE!***)
            Flask invokes custom algorithms to perform conversion 
            from URL to MP3/Chunks, then passes converted audio from
            Flask back up to MongoDB.
    4.  MongoDB receives converted audio from Flask for storage and user serving.
            Data passed from Server Layer #2: Flask to Server Layer #1: MongoDB.
    5.  Client receives converted audio from MongoDB for user serving.
            Data passed from Server Layer #1: MongoDB to client.
    """
    url = request.body
    print(url)


if __name__ == '__main__':
    app.run(port=5555, debug=True)
