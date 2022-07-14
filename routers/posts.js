const express = require('express');
const { upload,getPosts,like, comment } = require('../controllers/post');
const { Auth } = require('../middlewares/authorize');
const router = express.Router();
router
.post('/upload',Auth,upload())
.get('/posts',getPosts())
.post('/like',like())
.post('/comment',comment())

module.exports.post = router;