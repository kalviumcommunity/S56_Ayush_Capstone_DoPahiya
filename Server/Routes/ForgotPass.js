const express = require('express')
const { userModel } = require("../Database/Schema.js")
const { transporter } = require("../Utils/MailTransporter.js")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
require('dotenv').config()
const { ProtectedRoute } = require("../Middleware/ProtectedRoute")

const ForgotPassRouter = express.Router()

ForgotPassRouter.post("/forgotpassword", ProtectedRoute , async (req , res)=>{
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

ForgotPassRouter.put("/resetpass", ProtectedRoute , async (req , res)=>{
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

module.exports = { ForgotPassRouter }