const express = require('express')
const { feedbackModel } = require("../Database/Schema.js")
const { transporter } = require("../Utils/MailTransporter.js")
require('dotenv').config()
const { ProtectedRoute } = require("../Middleware/ProtectedRoute")

const FeedbackRouter = express.Router()

FeedbackRouter.post("/feedback", ProtectedRoute , async(req , res)=>{
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

module.exports = { FeedbackRouter }