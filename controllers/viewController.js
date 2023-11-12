const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Log In Page
exports.getLoginForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
};

// Log In Page 2 for verification
exports.getLoginForm2 = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'login2.html'));
};

// Sign Up page
exports.getSignUpForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'signup.html'));
};

// Landing page
exports.getHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'Home.html'));
};

// Home page
exports.getHome2 = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'Home2.html'));
};

// Regestering Token
exports.getTokenR = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'tokenReg.html'));
};

// doctor page1
exports.getDoctor1 = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'doctorp1.html'));
};

// PROFILE PAGE
exports.getProfile = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'myprofilepage.html'));
};