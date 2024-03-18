const express = require("express")
const port = 3000;

const app = express()

app.use(express.json())

app.get("/" , (req , res)=>{
    res.send("Server is running..!!")
})

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})