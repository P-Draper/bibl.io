const dotenv = require('dotenv')
const express = require('express')
const trackRoute = express.Router();
const multer = require('multer');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/User')
const AudioModel = require('./models/Audio')
const UrlModel = require('./models/Url')
const WordListModel = require('./models/WordList')
const TranscriptionModel = require('./models/Transcription')
const TranslationModel = require('./models/Translation')
const userRoutes = require('./routes/userRoutes')
const {notFound, errorHandler} = require('./middlewares/errorMiddleware')
const { Readable } = require('stream')

const app = express()
app.use('/tracks', trackRoute);
dotenv.config()
app.use(cors())
app.use(express.json())
let db

MongoClient.connect(process.env.MONGO + 'trackDB', (err, database) => {
  if (err) {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
  }
  db = database;
});
trackRoute.get('/:trackID', (req, res) => {
    try {
      var trackID = new ObjectID(req.params.trackID);
    } catch(err) {
      return res.status(400).json({ message: "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" }); 
    }
    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');
  
    let bucket = new mongodb.GridFSBucket(db, {
      bucketName: 'tracks'
    });
  
    let downloadStream = bucket.openDownloadStream(trackID);
  
    downloadStream.on('data', (chunk) => {
      res.write(chunk);
    });
  
    downloadStream.on('error', () => {
      res.sendStatus(404);
    });
  
    downloadStream.on('end', () => {
      res.end();
    });
  });


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO + 'Test');
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

app.get('/getUsers', (req, res) =>{
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getAudio', (req, res) =>{
    AudioModel.find()
    .then(audio => res.json(audio))
    .catch(err => res.json(err))
})

app.get('/getTranscription', (req, res) => {
    TranscriptionModel.find()
    .sort({ createdAt: -1 }) 
    .limit(1) 
    .then(transcription => res.json(transcription[0]))
    .catch(err => res.json(err));
});

app.get('/getTranslation', (req, res) => {
    TranslationModel.find()
    .sort({ createdAt: -1 }) 
    .limit(1) 
    .then(translation => res.json(translation[0]))
    .catch(err => res.json(err));
});


app.get('/getWordList', (req, res) => {
    WordListModel.find()
    .then(wordlist => res.json(wordlist))
    .catch(err => res.json(err))
})

app.get('/getUrl', (req, res) => {
    UrlModel.find()
    .then(url => res.json(url))
    .catch(err => res.json(err))
})

app.post('/postUrl', (req, res) => {
    const { Url, DesiredLanguage } = req.body;

    const newUrl = new UrlModel({ Url, DesiredLanguage });
    fetch('http://localhost:3001/convertUrl')
    newUrl.save()
        .then(savedUrl => {
            console.log("URL saved successfully:", savedUrl);
            res.json(savedUrl);
        })
        .catch(err => {
            console.error("Error saving URL:", err);
            res.status(500).json({ error: "Failed to save URL" });
        });
});

app.use('/api/users',userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(3001, () => {
    connect()
    console.log('server is running')
})