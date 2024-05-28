const express = require("express")
require("dotenv").config()
const port = process.env.PORT || 3000;
const {connectToDb , isConnected} = require("./Database/db.js")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const {userModel , feedbackModel , brandsModel , bikesModel , bikesPhotosModel} = require("./Database/Schema.js")
const nodemailer = require("nodemailer");
const crypto = require("crypto")
const mongoose = require("mongoose")
const { router } = require("./uploadrouter.js");
const { register } = require("module");
const {router2} = require("./GoogleAuth/route.js")

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

app.use(router);
app.use(router2);

app.get("/" , (req , res)=>{
    res.json({"Database" : `${isConnected() ? "Connected" : "Not Connected"}`})
})

app.get("/getuser/:name" , async (req , res)=>{
    try {
        let name = req.params.name
        let data = await userModel.find({username: name})
        res.send(data)
    } catch (error) {
        res.status(500).send("User Not Found")
    }
})

app.post("/login" , async (req , res)=>{
    let {email , password} = req.body
    let user = await userModel.findOne({ email: email })
    if (user){
        let hashedPassword = await bcrypt.compare(password,user.password)
        if (hashedPassword){
            let payload = {...user , timestamp: Date.now()}
            let token = jwt.sign(payload , process.env.SECRETKEY)
            res.send({username : user.username , token : token, fav : user.fav, profileImg: user.profileImg})
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
        await userModel.create({username: username , email:email , password:hashedPassword , fav:[] , bio:req.body.bio , profileImg:req.body.profileImg})
        res.send("Registration Successful")
    }
})

app.get("/getbrands" , async (req , res)=>{
    let data = await brandsModel.find({})
    res.send(data)
})

app.get("/getbikephotos" , async (req , res)=>{
    let limit = parseInt(req.query.limit); 
    if (!limit || limit <= 0) {
        let data = await bikesPhotosModel.find({}) 
        res.send(data); 
    }else{
        let data = await bikesPhotosModel.find({}).limit(limit); 
        res.send(data)
    }
})

app.get("/getbikes" , async (req , res)=>{
    let data = await bikesModel.find({})
    res.send(data)
})

app.get("/getbikebytype/:type", async (req, res) => {
    try {
        const type = req.params.type;
        let data = await bikesModel.find({ bodyType: type })
        if (data.length > 0) {
            data = await Promise.all(data.map(async (el) => {
                let photoData = await bikesPhotosModel.findOne({ name: el.name });
                // return el
                let finalData = Object.assign({}, el.toObject(), photoData ? photoData.toObject() : {});
                return finalData;
            }));

            res.send(data);
        } else {
            res.status(404).send("Bikes not found");
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error });
    }
});


app.get("/getbike/:id" , async (req , res)=>{
    try {
        const name = req.params.id;
        let finalData = {}
        let data = await bikesModel.findOne({name: name})
        if (data) {
            let photoData = await bikesPhotosModel.findOne({name: data.name})
            finalData = {...data.toObject() , ...photoData.toObject()}
            res.send(finalData);
        } else {
            res.send("Bike not found");
        }
    } catch (error) {
        res.status(500).send({message:"Internal Server Error" , error:error});
    }
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

app.post("/handlefav", async (req, res) => {
    let { id , user} = req.body;
    const Founduser = await userModel.findOne({ username: user });
    if (Founduser.fav.includes(id)){
        await userModel.updateOne({ _id: Founduser._id }, { $pull: { fav: id } });
        const updatedUser = await userModel.findOne({ username: user });
        res.send({message: "Removed from Favorites" , arr: updatedUser.fav});
    } else {
        await userModel.updateOne({ _id: Founduser._id, fav: { $ne: id } }, { $push: { fav: id } });
        const updatedUser = await userModel.findOne({ username: user });
        res.send({message: "Added to Favorites" , arr: updatedUser.fav});
    }
});

app.delete("/deleteuser/:id" , async (req , res)=>{
    let id = req.params.id
    await userModel.deleteOne({_id : id})
        .then((el)=>{
            res.send(el)
        })
        .catch((err)=>{
            res.send(err)
        })
})

app.put("/updatebio/:id", async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).send("ID parameter is required");
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send("Invalid ID parameter");
        }

        if (!req.body.bio) {
            return res.status(400).send("Bio parameter is required");
        }

        let id = req.params.id;
        let { bio } = req.body;
        await userModel.updateOne({ _id: id }, { $set: { bio: bio } });

        res.send("Bio Updated");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.put("/updateprofile/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let { username, email } = req.body;

        const existingUserWithUsername = await userModel.findOne({ username: username });
        if (existingUserWithUsername && existingUserWithUsername._id.toString() !== id) {
            return res.status(400).send("Username Already Taken");
        }

        const existingUserWithEmail = await userModel.findOne({ email: email });
        if (existingUserWithEmail && existingUserWithEmail._id.toString() !== id) {
            return res.status(400).send("Email Already Taken");
        }

        await userModel.updateOne({ _id: id }, { $set: { username: username, email: email } });

        res.send("Profile Updated");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port , (err)=>{
    if (err){
        console.log("Error In Starting the Server.!!")
        return
    }
    console.log(`Server is running on port ${port}`)
})