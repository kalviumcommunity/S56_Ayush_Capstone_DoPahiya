const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true
    },
    email : String,
    password : String
})

const feedbackSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    message : String
})

const userModel = mongoose.model("user-details" , userSchema)
const feedbackModel = mongoose.model("feedbacks" , feedbackSchema)

module.exports = {
    userModel , feedbackModel
}