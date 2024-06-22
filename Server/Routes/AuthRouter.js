const express = require('express')
const { userModel } = require("../Database/Schema.js")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const AuthRouter = express.Router()

AuthRouter.post("/login" , async (req , res)=>{
    let {email , password} = req.body
    let user = await userModel.findOne({ email: email })
    if (user){
        let hashedPassword = await bcrypt.compare(password,user.password)
        if (hashedPassword){
            let payload = {...user , timestamp: Date.now()}
            let token = jwt.sign(payload , process.env.SECRETKEY)
            res.send({username : user.username , token : token, fav : user.fav, profileImg: user.profileImg})
        }else{
            res.send("Wrong Password")
        }
    }else{
        res.send("User Does not exist")
    }
})

AuthRouter.post("/register" , async (req , res)=>{
    let {username , email , password} = req.body
    let user = await userModel.findOne({ email: email })
    let dupUser = await userModel.findOne({username : username})
    if (user){
        res.send("User already Exists")
    }else if (dupUser){
        res.send("Username Already Taken")
    }
    else{
        let hashedPassword = await bcrypt.hash(password,parseInt(process.env.LEVEL))
        await userModel.create({username: username , email:email , password:hashedPassword , fav:[] , bio:req.body.bio , profileImg:req.body.profileImg})
        res.send("Registration Successful")
    }
})

module.exports = { AuthRouter }