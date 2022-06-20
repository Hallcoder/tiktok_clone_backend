const express = require('express');
const { upload } = require('../controllers/post');
const router = express.Router();
const authorize = require('../middlewares/authorize')
router.post('/post',authorize,upload())