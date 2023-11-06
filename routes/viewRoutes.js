const express = require('express')
const router = express.Router()
const viewsController = require('./../controllers/viewController')

router.get('/', viewsController.getIndex)
router.get('/home', viewsController.getHome )
// router.get('/login', viewsController.getLoginForm)
// router.get('/signup', viewsController.getSignUpForm)

module.exports = router