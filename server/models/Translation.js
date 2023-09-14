const mongoose = require('mongoose')

const TranslationSchema = new mongoose.Schema(
    {
        text: {
            type: String
        }
    })

const TranslationModel = mongoose.model("translation", TranslationSchema)
module.exports = TranslationModel