const express = require('express');
const { upload,getPosts } = require('../controllers/post');
const { Auth } = require('../middlewares/authorize');
const router = express.Router();
router.post('/upload',Auth,upload());
router.get('/posts',getPosts());
module.exports.post = router;