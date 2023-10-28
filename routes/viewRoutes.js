const express = require('express')
const router = express.Router()
const viewsController = require('./../controllers/viewController')

router.get('/', viewsController.getHome)
router.get('/home2', viewsController.getHome2 )
router.get('/login', viewsController.getLoginForm)
router.get('/signup', viewsController.getSignUpForm)

module.exports = router