const express = require("express")
const router2 = express.Router();
const {userModel} = require("../Database/Schema.js")
const jwt = require("jsonwebtoken")
require("dotenv").config()

router2.post("/googlelogin", async (req, res) => {
    let data = req.body;
    let {email} =  jwt.decode(data.credential)
    let user = await userModel.findOne({ email: email })
    if (user){
        let payload = {...user , timestamp: Date.now()}
        let token = jwt.sign(payload , process.env.SECRETKEY)
        res.send({username : user.username , token : token, fav : user.fav, profileImg: user.profileImg})
    }else{
        res.send("User Does not exist")
    }
})

router2.post("/googleregister", async (req, res) => {
    let data = req.body;
    let {email, name, picture} =  jwt.decode(data.credential)
    let user = await userModel.findOne({ email: email })
    let dupUser = await userModel.findOne({username : name})
    if (user){
        res.send("User already Exists")
    }else if (dupUser){
        res.send("Username Already Taken")
    }else{
        let newUser = new userModel({
            username: name,
            email: email,
            password: "",
            fav: [],
            bio: "Hello, I am Bike Enthusiast.!!",
            profileImg: picture
        })
        let savedUser = await newUser.save();
        res.send("Registration Successful")
    }
})

module.exports = { router2 };