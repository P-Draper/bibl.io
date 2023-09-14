const mongoose = require('mongoose')

const UrlSchema = new mongoose.Schema(
    {
        Url: String,
        DesiredLanguage: String
    })

const UrlModel = mongoose.model("url", UrlSchema)
module.exports = UrlModel