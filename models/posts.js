const mongoose = require('mongoose');
const { userType } = require('./user');
const Joi = require('joi');
const postSchema=  new mongoose.Schema({
    uploadedBy:{
        type:userType,
        required:true
    },
    dateUploaded:{
        type:Date,
        default:Date.now(),
    },
    likes:{
        type:Array,
        default:[{user:'Foo'}]
    },
    comments:{
        type:Array,
        default:[{user:'Foo',date:Date.now(),replies:[],message:'Nice Picture Bro!'}]
    },
    shares:{
        type:Array,
        default:[{user:'Foo'}],
    },
    content:{
        type:Object,
        required:true
    },
    tags:{
        type:Array
    },
    isLikedByCurrentUser:{
        type:Boolean,
        default:false
    }
    });

// function validatePost(post){
//     const schema  = Joi.object({
//         uploadedBy:Joi.object().
//     })
// }

module.exports.Post = mongoose.model('Posts',postSchema);