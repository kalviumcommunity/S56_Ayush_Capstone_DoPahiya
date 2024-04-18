const express = require("express")
require("dotenv").config()
const port = process.env.PORT || 3000;
const {connectToDb , isConnected} = require("./Database/db.js")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const {userModel , feedbackModel , brandsModel , bikesModel} = require("./Database/Schema.js")
const nodemailer = require("nodemailer");
const { Timestamp } = require("mongodb");
const crypto = require("crypto")

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
            let payload = {...user , timestamp: Date.now()}
            let token = jwt.sign(payload , process.env.SECRETKEY)
            res.send({username : user.username , token : token})
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
            address : process.env.APP_ADDRESS
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

app.post("/forgotpassword" , async (req , res)=>{
    let email = req.body.email
    let user = await userModel.findOne({email : email})
    console.log(user)
    if (user){
        const verificationCode = Math.floor((crypto.randomInt(999999 - 100000 + 1) + 100000));
        
        let mailOptions = {
            from: {
                name : "DoPahiya",
                address : process.env.APP_ADDRESS
            },
            to: req.body.email,
            subject: 'Verification Code for Reset Password',
            html: `Thank you for reaching out to us at DoPahiya! We received your request to reset your password. Please use the following verification code to proceed with the password reset:<br><br> Verification Code: <b>${verificationCode}</b><br><br>This verification code is valid for a limited time period. If you did not initiate this password reset request, please disregard this email.<br><br>If you have any questions or concerns, feel free to contact us. We're here to help!<br><br>Best Regards,<br><b>The DoPahiya Team</b>`
        }
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(501).send(error)
            }else{
                console.log('Email Sent..!');
                res.send({code : verificationCode})
            }
        });
    }else{
        res.send("User Not Found..!!")
    }
})

app.put("/resetpass" , async (req , res)=>{
    let {email , new_pass} = req.body
    let hashedPassword = await bcrypt.hash(new_pass,parseInt(process.env.LEVEL))
    await userModel.updateOne({email : email} , {
        $set : {password : hashedPassword}
    })
    .then((el)=>{
        res.status(200).send("Password Updated")
    })
    .catch((err)=>{
        res.status(500).send(err)
    })

})


app.listen(port , (err)=>{
    if (err){
        console.log("Error In Starting the Server.!!")
        return
    }
    console.log(`Server is running on port ${port}`)
})