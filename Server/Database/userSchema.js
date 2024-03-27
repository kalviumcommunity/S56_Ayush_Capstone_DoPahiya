const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email : String,
    password : String
})

const userModel = mongoose.model("user-details" , userSchema)

module.exports = {
    userModel
}