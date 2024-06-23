require("dotenv").config()
const jwt = require("jsonwebtoken")
const { userModel } = require("../Database/Schema.js")

const ProtectedRoute = async (req,res,next) =>{
    try{
        let token =  req.headers.authorization.split(" ")[1]
        if (!token) return res.status(401).send("No Token")
        console.log(token)
        let decodedToken = jwt.verify(token , process.env.SECRETKEY)
        if (!decodedToken) return res.status(401).send("Invalid Token")
       
        let user = await userModel.findOne({username : decodedToken._doc.username})
        if (!user) return res.status(401).send("User Not Found")

        req.user = user
        next()
    }
    catch(err){
        console.error("Error in protectedRoute",err)
        res.status(401).send("Unauthorized Access")
    }
}

module.exports = { ProtectedRoute }