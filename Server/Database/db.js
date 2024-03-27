const mongoose = require("mongoose")
require("dotenv").config()

let connectToDb = async () =>{
    let trials = 3
    while (trials > 0){
        try{
            await mongoose.connect(process.env.URI)
            console.log("Connected to Database Successfully..!!")
            break
        }catch(err){
            trials--
            if (trials == 0){
                process.exit(1)
            }
        }
    }
    
}

let isConnected = () =>{
    return mongoose.connection.readyState == 1? true : false
}

module.exports = {
    connectToDb , isConnected
}