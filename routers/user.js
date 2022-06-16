const express = require('express')
const router  = express.Router();
const {signup,login,resetPassword} = require('../controllers/user')
router
.post('/signup',signup())
.post('/login',login())
.post('/resetPassword',resetPassword())
module.exports.user = router;