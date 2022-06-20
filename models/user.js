const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        minlength:1,
        maxlength:100,
        required:true,
    },
    password:{
        type:String,
        minlength:6,
        maxlength:200,
        required:true
    },
    resetPasswordToken:{
        type:String
    },
    profilePicture:{
        type:String,
        default:'avatar',
        required:false,
    },
    posts:{
        type:Array,
    },
    followers:{
        type:Array,
    },
    following:{
        type:Array,
    }
})
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
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(JSON.stringify({_id:this._id,email:this.email}),process.env.JWT_PRIVATE_KEY)
    return token;
}
module.exports.validate = validateUser
module.exports.userType = userSchema;
module.exports.User = mongoose.model('users',userSchema);