const express = require('express');
const router = express.Router();
const uploader = require('../middlewares/cloudinary.config.js');



router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
    // the uploader.single() callback will send the file to cloudinary and get you and obj with the url in return
    console.log('file is: ', req.file)
    
    if (!req.file) {
      console.log("there was an error uploading the file")
      next(new Error('No file uploaded!'));
      return;
    }

    res.status(200).json({
      image_url:req.file.path
    })
    
    // You will get the image url in 'req.file.path'
    // Your code to store your url in your database should be here
})

module.exports = router;