const express = require('express');
const { user } = require('./routers/user');
const { db } = require('./utils/db');
const cors = require('cors');
const app = express();
const PORT=process.env.PORT || 6000;
app
.use(express.json())
.use(function(req,res,next){
    cors({origin:'http://localhost:3000'})
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Methods', 'X-Request-With,Accept')
    res.header('Access-Control-Allow-Credentials', true)
    next()
})
.use('/user',user)
db();
app.listen(PORT,()=>{
    console.log('listening on port',PORT);
})