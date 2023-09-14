const mongoose = require('mongoose')

const AudioSchema = new mongoose.Schema({
    filename: String,
    chunkSize: Number,
    length: Number,
    uploadDate: Date
})

const AudioModel = mongoose.model("mp3.files", AudioSchema)
module.exports = AudioModel