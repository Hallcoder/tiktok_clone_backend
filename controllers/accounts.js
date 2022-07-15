const { User } = require("../models/user")

module.exports.getAccounts = () => {
    return async(req,res) => {
        console.log('hit the endpoint...')
        const accounts = await User.find({})
        console.log('accounts:',accounts)
        return res.status(200).json({message:'accounts here',data:accounts})
    }
} 