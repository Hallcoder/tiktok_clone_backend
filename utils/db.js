const mongoose = require('mongoose')
require('dotenv').config()
module.exports.db =  async()=>{
  return  await mongoose.connect('mongodb://localhost:27017/tiktok')
        .then(_=> console.log('connected'))
        .catch(error => console.error(error))
}