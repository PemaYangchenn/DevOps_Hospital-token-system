const path = require('path')

// Log In Page
exports.getLoginForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'login.html'))
}

// Sign Up page
exports.getSignUpForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'signup.html'))
}

// Landing page
exports.getHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'Home.html'))
}

// Home page
exports.getHome2 = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'Home2.html'))
}