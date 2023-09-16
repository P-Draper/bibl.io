const dotenv = require('dotenv')
const express = require('express')
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

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())

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

app.get('/getTranscription', (req, res) =>{
    TranscriptionModel.find()
    .then(transcript => res.json(transcript))
    .catch(err => res.json(err))
})

app.get('/getTranslation', (req, res) =>{
    TranslationModel.find()
    .then(translation => res.json(translation))
    .catch(err => res.json(err))
})

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
//posts

app.post('/postUrl', (req, res) => {
    /*
    POST request to perform audio conversion from client-served data.
    Processes goes like so:

    1.  Client receives URL from user input for high-level translation.
            Data passed from client to Server Layer #1: MongoDB.
    2.  MongoDB receives URL from client for storage and translation.
        (***THIS IS WHERE WE COULD BE!***)
            Data passed from Server Layer #1: MongoDB to Server Layer #2: Flask.
    3.  Flask receives URL from MongoDB for algorithmic conversion. 
            Flask invokes custom algorithms to perform conversion 
            from URL to MP3/Chunks, then passes converted audio from
            Flask back up to MongoDB.
    4.  MongoDB receives converted audio from Flask for storage and user serving.
        (***THIS IS ALSO WHERE WE COULD BE!***)
            Data passed from Server Layer #2: Flask to Server Layer #1: MongoDB.
    5.  Client receives converted audio from MongoDB for user serving.
            Data passed from Server Layer #1: MongoDB to client.
    */
    const { Url, DesiredLanguage } = req.body;

    const newUrl = new UrlModel({ Url, DesiredLanguage });
    fetch('/convertUrl')
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