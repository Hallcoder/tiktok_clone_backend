const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
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
        maxlength:200,
        required:true
    },
    resetPasswordToken:{
        type:String
    }
})
userSchema.methods.generateAuthToken = () =>{
    const token = jwt.sign({_id:this._id,username:this.username},process.env.JWT_PRIVATE_KEY)
    return token;
}
function validateUser(user,type){
    const schema   = Joi.object({
        username:Joi.string().min(1).required(),
        email:Joi.string().email({tlds:{allow:false}}).required().min(5).required(),
        password:Joi.string().min(6).max(15).required()
    })
    if(type === 'login'){
        let schema = Joi.object({
            email:Joi.string().email({tlds:{allow:false}}).required().min(5).required(),
            password:Joi.string().min(6).max(15).required()
        })
        return schema.validate(user);
    }
    return schema.validate(user);
}
module.exports.validate = validateUser
module.exports.User = mongoose.model('users',userSchema);