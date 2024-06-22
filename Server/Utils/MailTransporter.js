const nodemailer = require("nodemailer");
require('dotenv').config()

var transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.APP_ADDRESS,
        pass: process.env.APP_PASS
    }
});

module.exports = { transporter }