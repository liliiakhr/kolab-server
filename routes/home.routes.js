const express = require('express');
const router = express.Router();
const PostModel =  require('../models/Post.model');



router.get('/home', async (req, res) => {

    try{
        let response = await PostModel.find().limit(10);
        res.status(200).json("Home page", response)
    }
    catch(error){
        res.status(500).json({
            errorMessage: "Post cannot be loaded",
            message: error
        })
    }
})



module.exports = router;