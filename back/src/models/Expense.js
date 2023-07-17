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
        requird:true,
        unique:false
    },
    name: {
        type: String,
        requird:true,
        unique:false
    },
    limit: {
        type: Number,
        requird:true,
        unique:false
    },
    spent: {
        type: Number,
        requird:true,
        unique:false
    },
    type: {
        type: String,
        requird:true,
        unique:false
    },
    date: {
        type: String,
        requird:false,
        unique:false
    }
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Expense', schema)