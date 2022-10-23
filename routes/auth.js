const express = require('express')
const router = express.Router()
const {validatorRegister,validatorLogin}= require('../validators/auth')
const {registerCtrl,loginCtrl}= require('../controllers/auth')

/**
 * crear un registro
 */
router.post('/register',validatorRegister,registerCtrl)

/**
 * login
 */

router.post('/login',validatorLogin,loginCtrl)

module.exports = router;