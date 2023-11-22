const express = require("express")
const tokenController = require('./../controllers/tokenController')
const authController = require('./../controllers/authController')
const router = express.Router()

router.post('/token', authController.tokenc)
router.post('/register-token', tokenController.createToken);

router
    .route('/')
    .get(tokenController.getAllToken)
    .post(tokenController.createToken)

router
    .route('/:id')
    .get(tokenController.getToken)
    .patch(tokenController.updateToken)
    .delete(tokenController.deleteToken)

module.exports = router
