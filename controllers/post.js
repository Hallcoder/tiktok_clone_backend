const cloudinary = require('../utils/cloudinary')
const User = require('../models/user');
module.exports.upload = ()=>{
    return async(req,res)=>{
        const video = req.body.post;
        if(!req.user) return res.status(401).json({message:'Not Authorized',status:'failed'})
        const uploadedVideo  = await cloudinary.uploader.uploader(video.file,{
            folder:'tiktok/videos',
        })
        const user  = await User.findOneAndUpdate({_id:req.user._id},{
            $push:{posts:{video:uploadedVideo,caption:video.caption,visibility:video.visibility,action:video.actions}}
        });
        if(!user) return res.status(404).json({message:'User is not found',status:'failed'})
        
        
    }
}