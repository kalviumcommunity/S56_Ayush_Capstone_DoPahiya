const express = require('express')
const { userModel } = require("../Database/Schema.js");
const e = require('express');
const { ProtectedRoute } = require('../Middleware/ProtectedRoute.js');

const FavRouter = express.Router()

FavRouter.post("/handlefav", ProtectedRoute , async (req, res) => {
    let { id } = req.body;
    let user = req.user.username;
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

module.exports = { FavRouter }