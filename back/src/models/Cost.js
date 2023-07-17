const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,        
    },
    userId: {
        type: String,
        requird:false,
        unique:false
    },
    expenseId: {
        type: String,
        requird:false,
        unique:false
    },
    ammount: {
        type: Number,
        requird:false,
        unique:false
    },
    date: {
        type: String,
        requird:false,
        unique:false
    }
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Cost', schema)