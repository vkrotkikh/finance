const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: false,
        unique: true,        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    name: {
        type: String,
        required: false,
        unique: false,
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    mylimit: {
        type: Number,
        required: false,
        unique: false
    },
    regDate: {
        type: String,
        required: false,
        unique: false

    }
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('User', schema)