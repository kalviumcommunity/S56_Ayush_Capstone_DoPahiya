const express = require("express")
require("dotenv").config()
const port = process.env.PORT || 3000;
const {connectToDb , isConnected} = require("./Database/db.js")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const {userModel , feedbackModel , brandsModel , bikesModel} = require("./Database/Schema.js")
const nodemailer = require("nodemailer")

const app = express()
app.use(cors())
app.use(express.json())
connectToDb()

var transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.APP_ADDRESS,
        pass: process.env.APP_PASS
    }
});

app.get("/" , (req , res)=>{
    res.json({"Database" : `${isConnected() ? "Connected" : "Not Connected"}`})
})

app.post("/login" , async (req , res)=>{
    let {email , password} = req.body
    let user = await userModel.findOne({ email: email })
    if (user){
        let hashedPassword = await bcrypt.compare(password,user.password)
        if (hashedPassword){
            res.send(user.username)
        }else{
            res.send("Wrong Password")
        }
    }else{
        res.send("User Does not exist")
    }
})

app.post("/feedback" , async(req , res)=>{
    console.log(req.body)
    var mailOptions = {
        from: {
            name : "DoPahiya",
            address : 'dopahiya.feedback@gmail.com'
        },
        to: req.body.email,
        subject: 'Thank You for Your Feedback from DoPahiya!',
        html: `<b>Dear ${req.body.firstName},! </b><br><br> Thank you for taking the time to share your feedback with us here at DoPahiya! Your input is incredibly valuable to us and helps us improve our services to better meet your needs.<br><br>We have received your message, and we want to express our gratitude for your contribution to our ongoing efforts to enhance the user experience. Your insights will be carefully considered as we strive to provide the best possible service to all our users.<br><br>Here's a recap of the feedback you provided:<br>First Name : ${req.body.firstName}<br>Last Name : ${req.body.lastName}<br>Message : ${req.body.message}<br><br> Once again, thank you for reaching out to us. If you have any further questions, suggestions, or concerns, please don't hesitate to contact us. We're here to assist you.<br><br>Best Regards, <br><b>The DoPahiya Team</b>`
    }

    try{
        await feedbackModel.create(req.body)
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.send(error)
            }else{
                console.log('Email Sent..!');
                res.send("FeedBack taken.!!")
            }
        });
    }catch(err){
        res.send(err)
    }
})

app.post("/register" , async (req , res)=>{
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
        await userModel.create({username: username , email:email , password:hashedPassword})
        res.send("Registration Successful")
    }
})

app.get("/getbrands" , async (req , res)=>{
    let data = await brandsModel.find({})
    res.send(data)
})

app.get("/getbikes" , async (req , res)=>{
    let data = await bikesModel.find({})
    res.send(data)
})

app.listen(port , (err)=>{
    if (err){
        console.log("Error In Starting the Server.!!")
        return
    }
    console.log(`Server is running on port ${port}`)
})