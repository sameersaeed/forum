const mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: false
    },
    password: {
        type: String,
        required: true,
        unique: false
    }
})
const usersDb = mongoose.model('users', schema)

module.exports = usersDb;
