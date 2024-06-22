const express = require('express')
const { brandsModel , bikesModel , bikesPhotosModel } = require("../Database/Schema.js")

const BikeRouter = express.Router()

BikeRouter.get("/getbrands" , async (req , res)=>{
    let data = await brandsModel.find({})
    res.send(data)
})

BikeRouter.get("/getbikephotos" , async (req , res)=>{
    let limit = parseInt(req.query.limit); 
    if (!limit || limit <= 0) {
        let data = await bikesPhotosModel.find({}) 
        res.send(data); 
    }else{
        let data = await bikesPhotosModel.find({}).limit(limit); 
        res.send(data)
    }
})

BikeRouter.get("/getbikes" , async (req , res)=>{
    let data = await bikesModel.find({})
    res.send(data)
})

BikeRouter.get("/getbikebytype/:type", async (req, res) => {
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


BikeRouter.get("/getbike/:id" , async (req , res)=>{
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

module.exports = { BikeRouter }