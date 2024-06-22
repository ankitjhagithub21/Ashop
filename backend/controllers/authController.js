const User = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const sendMail = require("../middlewares/sendMail");

const register = async(req,res) =>{
    try{

        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({"message":"All fields are required."})
        }

        let user = await User.findOne({email})

        if(user){
            return res.status(400).json({"message":"User already exists."})
        }
    
        const hashedPassword = await bcrypt.hash(password,10)

        user = {
            name,
            email,
            password:hashedPassword
        }


        const otp = Math.floor(Math.random()*1000000)
        const activationToken = jwt.sign({user,otp},process.env.JWT_SECRET,{expiresIn:"5m"})

        await sendMail(email,"A Shop - Verification Otp", `Your otp is ${otp}`)

        res.status(200).json({
            message:"Otp send to your email.",
            activationToken
        })

    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const verifyUser = async(req,res) =>{
    try{
        const {otp,activationToken} = req.body;
        const verify = jwt.verify(activationToken,process.env.JWT_SECRET)
        if(!verify) return res.status(400).json({"message":"Otp expired."})
        
        if(verify.otp != otp){
            return res.status(400).json({"message":"Wrong otp."})
        }

        await User.create({
            name:verify.user.name,
            email:verify.user.email,
            password:verify.user.password
        });

        res.status(201).json({"message":"Account created."})


    }catch(error){
        res.status(500).json({error:"Internal Server error"})
    }
}


const login = async(req,res) =>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({"message":"All fields are required."})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({"message":"Wrong email or password."})
        }

        const comparePassword = await bcrypt.compare(password,user.password)

        if(!comparePassword){
            return res.status(404).json({"message":"Wrong email or password."})
        }

        const token =  jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"15d"})
        
        res.status(200).json({
            message:`Welcome back ${user.name}`,
            token
            
        })

    }catch(error){
        res.status(500).json({error:error.message})
    }
}


const myProfile = async(req,res) =>{
    try{
        const user = await User.findById(req.user._id).select("-password")

        if(!user){
            return res.status(400).json({"Error":"User not found"})
        }

        res.status(200).json({user})

       

    }catch(error){
        res.status(500).json({error:"Internal Server error"})
    }
}

module.exports = {
    register,
    verifyUser,
    login,
    myProfile

}