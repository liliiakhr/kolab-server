const express = require('express');
const router = express.Router();
const PostModel =  require('../models/Post.model');
const GroupModel = require('../models/Group.model');

router.get('/home', async (req, res) => {

    try{
        let response = await PostModel.find().limit(10)
                                .populate('creator')
                                .populate('comments.owner')
        res.status(200).json(response)
    }
    catch(error){
        res.status(500).json({
            errorMessage: "Post cannot be loaded",
            message: error
        })
    }
})

router.get('/navbar/groupnames/:userId', async (req, res, next) => {
    try {
        const { userId } =  req.params;
        let groupNames = await GroupModel.find({ users: { $in: userId }}, { name: 1, _id: 0 })
        res.status(200).json(groupNames)
    }
    catch(error){
        res.status(500).json({
            errorMessage: "Post cannot be loaded",
            message: error
        })
    }
})

module.exports = router;