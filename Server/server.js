const express = require("express")
require("dotenv").config()
const port = process.env.PORT || 3000;

const app = express()

app.use(express.json())

app.get("/" , (req , res)=>{
    res.send("Server is running..!!")
})

app.listen(port , (err)=>{
    if (err){
        console.log("Error In Starting the Server.!!")
        return
    }
    console.log(`Server is running on port ${port}`)
})