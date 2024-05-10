const express = require('express');
const router = express.Router();
const cloudinary = require('./Cloudinary');
const upload = require('./multer');
const { userModel } = require('./Database/Schema');
const fs = require('fs');

router.post('/upload/:id', upload.single('image'), async (req, res) => {
    let id = req.params.id;
    console.log(req.file);
    try {
        filePath = req.file.path;
        const result = await cloudinary.uploader.upload(req.file.path , async function(error, result) {
            if(error) {
                console.log(error ,"error");
                return res.status(500).send({error : error});
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
    }finally {
        if (filePath) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting temporary file:', err);
                }
            });
        }
    }
});

module.exports = { router };