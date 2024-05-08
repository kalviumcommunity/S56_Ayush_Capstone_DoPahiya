const express = require('express');
const router = express.Router();
const cloudinary = require('./Cloudinary');
const upload = require('./multer');
const { userModel } = require('./Database/Schema');

router.post('/upload/:id', upload.single('image'), async (req, res) => {
    let id = req.params.id;
    try {
        const result = await cloudinary.uploader.upload(req.file.path , async function(error, result) {
            if(error) {
                console.log(error ,"error");
                return res.status(500).send({error : "File does not support. Please upload a jpg, jpeg or png file"});
            }else{
                await userModel.findOneAndUpdate({_id: id} , {profileImg : result.url})
                    .then((data) => {
                        res.status(200).send({url : result.url});
                    })
                    .catch((err) => {
                        res.status(500).send({error : err});
                    })
            }
        });
    } catch (err) {
        console.log(err , "err")
        console.error(err);
    }
});

module.exports = { router };