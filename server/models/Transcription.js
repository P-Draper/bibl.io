const mongoose = require('mongoose')

const TranscriptionSchema = new mongoose.Schema(
    {
        text: {
            type: String
        }
    })

const TranscriptionModel = mongoose.model("transcriptions", TranscriptionSchema)
module.exports = TranscriptionModel