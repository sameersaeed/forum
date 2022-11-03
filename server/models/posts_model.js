const mongoose = require('mongoose');
var schema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true,
        unique: false
    }
})
const postDb = mongoose.model('posts', schema)

module.exports = postDb;
