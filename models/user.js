const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('config')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        minlength:1,
        maxlength:100,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:6,
        maxlength:15,
        required:true
    }
})
userSchema.methods.generateAuthToken = () =>{
    const token = jwt.sign({_id:this._id,username:this.username}, config.get('jwtPrivateKey'))
    return token;
}
function validateUser(user){
    const schema   = Joi.object({
        email:Joi.string().required().min(5).required(),
        username:Joi.string().min(1).required(),
        password:Joi.string().min(6).max(15).required()
    })
    return schema.validate(user)
}
module.exports.validate = validateUser
module.exports.UserSchema = mongoose.model('users',userSchema);