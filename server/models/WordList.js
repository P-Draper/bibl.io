const mongoose = require('mongoose')

const WordListSchema = new mongoose.Schema(
    {})

const WordListModel = mongoose.model("wordlist", WordListSchema)
module.exports = WordListModel