const path = require('path')
// Log In Page
// exports.getLoginForm = (req, res) => {
//     res.sendFile(path.join(__dirname, '../', 'views', 'index.html#exampleModal'))
// }

// // Sign Up page
// exports.getSignUpForm = (req, res) => {
//     res.sendFile(path.join(__dirname, '../', 'views', 'signup.html'))
// }

// Landing page
exports.getIndex = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'))
}

// Home page
exports.getHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'home.html'))
}