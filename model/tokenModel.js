const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    date: {
        type: String,
        required:[true, 'the data is required']
    },
    departmentR: {
        type:String,
        required:[true,'the department is required']
    },
    username: {
        type: String
    },
    cid: {
        type:String
    },
    phoneno: {
        type: Number
    }

})

const Token = mongoose.model('Token', tokenSchema)
module.exports = Token;