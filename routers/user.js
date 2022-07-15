const express = require('express')
const router  = express.Router();
const {signup,login,resetPassword,uploadImage, updateUser} = require('../controllers/user');
const { Auth } = require('../middlewares/authorize');
router
.post('/signup',signup())
.post('/profilePicture',Auth,uploadImage())
.post('/login',login())
.post('/resetPassword',resetPassword())
.put('/updateInfo',updateUser())
module.exports.user = router;