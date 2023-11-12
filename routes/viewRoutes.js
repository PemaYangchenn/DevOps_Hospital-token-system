const express = require('express')
const router = express.Router()
const viewsController = require('./../controllers/viewController')
const authController = require('./../controllers/authController')

router.get('/', viewsController.getHome)
router.get('/home2', authController.protect)
router.get('/home2', viewsController.getHome2 )
router.get('/login', viewsController.getLoginForm)
router.get('/login2', viewsController.getLoginForm2)
router.get('/signup', viewsController.getSignUpForm)
router.get('/tokenReg', authController.protect)
router.get('/tokenReg', viewsController.getTokenR)
router.get('/doctor1', authController.protect)
router.get('/doctor1', viewsController.getDoctor1)
router.get('/me', authController.protect)
router.get('/me', viewsController.getProfile)

module.exports = router
