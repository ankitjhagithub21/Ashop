const jwt = require('jsonwebtoken')
const User = require("../models/user")
const isAuth  = async(req,res,next) =>{
  try{
    const token = req.headers.token;
    if(!token){
        return res.status(400).json({"message":"Please login."})
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
    if(!decoded){
        return res.status(401).json({"message":"Unauthorized."})
    }
    
    const userData = await User.findById(decoded._id).select("-password")
    
    if(!userData){
        return res.status(404).json({"message":"User not found."})
    }
    req.user = userData
    next();


  }catch(error){
    res.status(500).json({"Error":"Internal Server error"})
  }
}

module.exports = isAuth