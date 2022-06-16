const lodash = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
module.exports.signup = () => {
  return async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return  res.status(401).json({ message: error.message, status: "failed!" });
      const user = new User(
        lodash.pick(req.body, ["username", "password", "email"])
      );
      console.log(user.password)
      const salt = await bcrypt.genSalt(10);
      let hashed = await bcrypt.hash(user.password,salt);
      user.password  = hashed;
      await user.save();
      return res.status(200).json({data:lodash.pick(user, ["username","email"]),message:"User registered successfully",status:"success"});
    } catch (error) {
     console.error(error)
     res.send(500).json({message:"internal server error",status:"failed"});
    }
  };
};
module.exports.login = () => {
  return async (req, res) => {
    try {
        const { error } = validate(req.body,'login');
        if (error) return res.status(401).json({ message: error.message, status: "failed!" });
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(401).json({message:"wrong email or password", status: "failed!"})
        let isPasswordValid = await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordValid) return res.status(401).json({ message:"wrong email or password", status: "failed!"})
        const token = user.generateAuthToken();
        console.log(token);
        res.cookie("token",token,{
            secure:true,
            sameSite:'none',
        })
        res.status(200).json({data:lodash.pick(user,["username","email"]),message:"Login successfully",status: "success"});
      } catch (error) {
        console.log(error)
       return res.status(401).json({ message: 'internal server error', status: "failed!" });
      }
  };
};
module.exports.resetPassword = () => {
  return async (req, res) => {};
};
