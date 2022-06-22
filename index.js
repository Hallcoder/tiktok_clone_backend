const express = require('express');
const { user } = require('./routers/user');
const { db } = require('./utils/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { post } = require('./routers/posts');
const app = express();
const PORT= 4000;
app.use(express.json({limit:'250mb'}))
app.use(function(req,res,next){
    cors({origin:'http://localhost:3000'})
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Headers', 'X-Request-With,Accept,Content-Type,X-HTTP-Method-Override')
    res.header('Access-Control-Allow-Credentials', true)
    next()
})
app.use(cookieParser())
app.use('/user',user)
app.use('/post',post)
db();
app.listen(PORT,()=>{
    console.log('listening on port',PORT);
})