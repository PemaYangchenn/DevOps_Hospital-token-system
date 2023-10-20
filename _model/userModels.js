const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please tel us your name!']
    },
    email: {
        type: String,
        required:[true, 'Please provide me valid email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide validate email']
    },
    contactNumber: {
        type:String,
        required: [true, 'Please provide a contact number'],
        unique: true,
        validate: {
            validator: function(value){
                return /^\d{8}$/.test(value)
            },
            message:'contact number should be numeric and exactly 8 digits'
        }
    },
    cidNumber: {
        type:String,
        required: [true, 'Please provide a contact number'],
        unique: true,
        validate: {
            validator: function(value){
                return /^\d{11}$/.test(value)
            },
            message:'contact number should be numeric and exactly 11 digits'
        }
    },
    password:{
        type: String,
        require:[true, 'Please procide a password'],
        minlength: 8,
        select:false,
    },
    role: {
        type: String,
        enum:['user', 'admin', 'doctor'],
        default: 'user'
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;
