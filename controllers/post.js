const { Post } = require("../models/posts");
const { User } = require("../models/user");
const { cloudinary } = require("../utils/cloudinary");
module.exports.upload = () => {
  return async (req, res) => {
    try {
      const video = req.body;
      if (!req.user)
        return res
          .status(401)
          .json({ message: "Not Authorized", status: "failed" });
      const uploadedVideo = await cloudinary.uploader.upload_large(video.file, {
        folder: "tiktok/videos",
        use_filename: true,
        resource_type: "video",
        chunk_size: 5000000,
      });
      const vid = {
        video: uploadedVideo,
        caption: video.caption,
        visibility: video.visibility,
        action: video.actions,
      };
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            posts: vid,
          },
        }
      );
      if (!user)
        return res
          .status(404)
          .json({ message: "User is not found", status: "failed" });
      await user.save();
      const post = new Post({
        uploadedBy: user,
        content: uploadedVideo,
      });
      await post.save();
      res
        .status(200)
        .json({ message: "Video uploaded successfully", status: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({message:error})
    }
  };
};

module.exports.getPosts = () => {
  return async (req, res) => {
    const posts = await Post.find({});
    res.status(200).json({ data: posts, status: "success" });
  };
};
module.exports.like = () => {
  return async(req,res) => {
    let post;
    try {
      if(req.body.action === 'like'){
        post = await Post.findByIdAndUpdate(req.body.post,{
         $push:{likes:req.body.user}
       });
     }else{
       post = await Post.findByIdAndUpdate(req.body.post,{
         $pull:{likes:req.body.user}
       })
     }
    await post.save();
    return res.status(200).json({message:`${req.body.action} successfully done`,status:'success'});
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'internal server error'})
    }
    
  }
}
module.exports.comment = () => {
  return async(req,res) =>{
    const post = await Post.findByIdAndUpdate(req.body.post,{
      $push:{comments:{user:req.body.user,replies:[],content:req.body.comment,date:new Date()}}
    })
    await post.save();
    return res.status(200).json({message:'commented successfully',status:'sucess'})
  }
}
