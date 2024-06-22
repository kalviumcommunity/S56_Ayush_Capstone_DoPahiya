const express = require('express')
const { userModel } = require("../Database/Schema.js")

const ProfileRouter = express.Router()

ProfileRouter.get("/getuser/:name" , async (req , res)=>{
    try {
        let name = req.params.name
        let data = await userModel.find({username: name})
        res.send(data)
    } catch (error) {
        res.status(500).send("User Not Found")
    }
})

ProfileRouter.delete("/deleteuser/:id" , async (req , res)=>{
    let id = req.params.id
    await userModel.deleteOne({_id : id})
        .then((el)=>{
            res.send(el)
        })
        .catch((err)=>{
            res.send(err)
        })
})

ProfileRouter.put("/updatebio/:id", async (req, res) => {
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

ProfileRouter.put("/updateprofile/:id", async (req, res) => {
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

module.exports = { ProfileRouter }