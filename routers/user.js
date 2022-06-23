const express = require('express')
const router  = express.Router();
const {signup,login,resetPassword,uploadImage} = require('../controllers/user');
const { Auth } = require('../middlewares/authorize');
router
.post('/signup',signup())
.post('/profilePicture',uploadImage())
.post('/login',login())
.post('/resetPassword',resetPassword())
module.exports.user = router;