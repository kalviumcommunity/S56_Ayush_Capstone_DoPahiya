const mongoose = require("mongoose")

const bodyTypeEnum = ['Sports', 'Naked', 'Adventure', 'Street', 'Superbike', 'Scooter', 'Cruiser', 'Classic', 'Scrambler', 'Supermoto', 'Adventure' , 'Tourer', 'Sports'];

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
    brand_id : {
        type : String,
        unique : true,
        index : true
    }
})
const brandsModel = mongoose.model("brands" , brandSchema)


const bikeDetailsSchema = new mongoose.Schema({
    name: String,
    exShowroomPrice: Number,
    engine: String,
    engineType: String,
    cooling: String,
    maxPower: String,
    maxTorque: String,
    cityMileage: String,
    fuelCapacity: String,
    gearBox: String,
    starting: String,
    bodyType: {
        type: [String],
        enum: bodyTypeEnum
    },
    suitableAge : Array,
    brand_id: {
        type : String,
        unique : true,
        index : true,
        ref : "brandsModel"
    },
    banner : String,
    frontView : String, 
    photos : Array
})

const userModel = mongoose.model("user-details" , userSchema)
const feedbackModel = mongoose.model("feedbacks" , feedbackSchema)
const bikesModel = mongoose.model("bike-details" , bikeDetailsSchema)

module.exports = {
    userModel , feedbackModel , brandsModel , bikesModel
}