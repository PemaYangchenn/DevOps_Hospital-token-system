const User = require('./../models/userModels')
const jwt = require('jsonwebtoken')
const AppError = require('./../utils/appError')

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
        
    })
}
const createSendToken = (user, statusCode, res) =>{
    const token = signToken(user._id)
    const cookieOptions ={
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
    }
    res.cookie('jwt', token, cookieOptions)
    
    res.status(statusCode).json({
        status: "success",
        token,
        data:{
            user
        }
    })
}

exports.signup = async(req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        // const token = signToken(newUser._id)
        // res.status(201).json({
        //     status:"success",
        //     token,
        //     data:{
        //         user:newUser
        //     }
        // })
        createSendToken(newUser, 201, res)
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
    }

exports.login = async (req, res, next) => {
    try {
        const { cidNumber, password } = req.body;  // here i am making cid as cidNumber

        // Check if the cidNumber and password exist
        if (!cidNumber || !password) {
            return next(new AppError('Please provide a cidNumber and password!', 400));
        }

        // Check if user exists
        const user = await User.findOne({ cidNumber }).select('+password');

        // If no user or password is incorrect, send error
        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect cidNumber or password', 401));
        }

        // If everything's okay, send the token to client
        createSendToken(user,200,res)
        // const token = signToken(user._id)
        // res.status(200).json({
        //     status:"success",
        //     token,
        // })
    }
    catch{
        
    }
}
exports.logout = (req, res) => {
    res.cookie('token','',{
        expires: new Date(Date.now() + 10 *1000),
        httpOnly:true,
    })
    res.status(200).json({status : 'success'})
}
