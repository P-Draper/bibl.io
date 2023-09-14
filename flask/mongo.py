import os
from pymongo import MongoClient
from os.path import join, dirname
from dotenv import load_dotenv
import gridfs

class MongoHandler:
    def __init__(self, mongo_uri):
        self.mongo_uri = mongo_uri

    def connect(self):
        try:
            conn = MongoClient(self.mongo_uri, port=27017)
            print('MongoDB Connected', conn)
            return conn.Test
        except Exception as err:
            print(f'Error in MongoDB connection: {err}')

class FileHandler:
    def __init__(self, file_loc, file_name, fs):
        self.file_loc = file_loc
        self.file_name = file_name
        self.fs = fs

    def upload_file(self):
        with open(self.file_loc, 'rb') as file_data:
            data = file_data.read()
        self.fs.put(data, filename=self.file_name)
        print('Upload complete.')

    @staticmethod
    def download_file(download_loc, db, fs, file_name):
        data = db.mp3.files.find_one({"filename": file_name})

        fs_id = data['_id']
        out_data = fs.get(fs_id).read()

        with open(download_loc, 'wb') as output:
            output.write(out_data)

        print("Download Completed!")

if __name__ == '__main__':
    dotenv_path = join(dirname(__file__), ".env")
    load_dotenv(dotenv_path)
    MONGO = os.environ.get("MONGO")
    print(MONGO)

    file_name = 'Bolano.mp3'
    file_loc = 'audiofiles/' + file_name
    down_loc = os.path.join(os.getcwd() + "/downloads/", file_name)

    mongo_handler = MongoHandler(MONGO)
    db = mongo_handler.connect()
    fs = gridfs.GridFS(db, collection='mp3')

    file_handler = FileHandler(file_loc=file_loc, file_name=file_name, fs=fs)
    file_handler.upload_file()
    FileHandler.download_file(down_loc, db, fs, file_name)