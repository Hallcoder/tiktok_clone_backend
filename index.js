const express = require('express');
const { user } = require('./routers/user');
const { db } = require('./utils/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { post } = require('./routers/posts');
const { accounts } = require('./routers/accounts');
const app = express();
const PORT= process.env.PORT;
app.use(express.json({limit:'250mb'}))
app.use(function(req,res,next){
    cors({origin:'https://tiktok-clone2.vercel.app'})
    res.header('Access-Control-Allow-Origin', 'https://tiktok-clone2.vercel.app')
    res.header('Access-Control-Allow-Methods', 'PUT,GET,POST')
    res.header('Access-Control-Allow-Headers', 'X-Request-With,Accept,Content-Type,X-HTTP-Method-Override')
    res.header('Access-Control-Allow-Credentials', true)
    next()
})
app
.use(cookieParser())
.use('/user',user)
.use('/post',post)
.use('/accounts',accounts)
db();
app.listen(PORT,()=>{
    console.log('listening on port shown here:',PORT);
})