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

const brandSchema = new mongoose.Schema({
    name : String,
    logo : String,
    brand_id : String
})

const bikeDetailsSchema = new mongoose.Schema({
    name: String,
    exShowroomPrice: String,
    engine: String,
    engineType: String,
    cooling: String,
    maxPower: String,
    maxTorque: String,
    cityMileage: String,
    fuelCapacity: String,
    gearBox: String,
    starting: String,
    bodyType: Array,
    suitableAge : Array,
    brand_id: String,
    banner : String,
    frontView : String, 
    photos : Array
})

const userModel = mongoose.model("user-details" , userSchema)
const feedbackModel = mongoose.model("feedbacks" , feedbackSchema)
const brandsModel = mongoose.model("brands" , brandSchema)
const bikesModel = mongoose.model("bike-details" , bikeDetailsSchema)

module.exports = {
    userModel , feedbackModel , brandsModel , bikesModel
}