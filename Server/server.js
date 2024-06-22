const express = require("express")
require("dotenv").config()
const port = process.env.PORT || 3000;
const {connectToDb , isConnected} = require("./Database/db.js")
const cors = require("cors")

const { AuthRouter } = require("./Routes/AuthRouter.js")
const { UploadRouter } = require("./Routes/uploadrouter.js");
const { GoogleAuthRouter } = require("./GoogleAuth/route.js")
const { FeedbackRouter } = require("./Routes/FeedbackRouter.js")
const { ForgotPassRouter } = require("./Routes/ForgotPass.js")
const { BikeRouter } = require("./Routes/BikeRouter.js")
const { ProfileRouter } = require("./Routes/ProfileRouter.js")
const { FavRouter } = require("./Routes/FavRouter.js")

const app = express()

app.use(cors())
app.use(express.json())

connectToDb()

app.use( AuthRouter );
app.use( GoogleAuthRouter );
app.use( BikeRouter );
app.use( UploadRouter );
app.use( FeedbackRouter );
app.use( ForgotPassRouter );
app.use( ProfileRouter );
app.use( FavRouter );

app.get("/" , (req , res)=>{
    res.json({"Database" : `${isConnected() ? "Connected" : "Not Connected"}`})
})

app.listen(port , (err)=>{
    if (err){
        console.log("Error In Starting the Server.!!")
        return
    }
    console.log(`Server is running on port ${port}`)
})