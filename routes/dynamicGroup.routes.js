const router = require("express").Router();
const GroupModel = require('../models/Group.model');
const PostModel = require("../models/Post.model");


router.get('/:group', async (req, res, next) => {
    
    // Params, 2 querries, 1 for post model 1 for group model, populate comments
    try {
        const { group: name } = req.params;
        let groupData = await GroupModel.findOne({name: name})
        res.status(200).json(groupData)
    }
    catch(error) {
        res.status(500).json({
            errorMessage: "It seems that the group you look for doesn't exist."
        })
    }
})

router.post('/:group/add-post', async (req, res, next) => {
    
    // Params, 2 querries, 1 for post model 1 for group model, populate comments
    try {
        const { title, content, creator, groupOrigin} = req.body;

        let groupData = await PostModel.create({ title, content, creator, groupOrigin })
        await GroupModel.findByIdAndUpdate(groupOrigin, {$inc : {postCount: 1}})
    
        res.status(200).json(groupData)
    }
    catch(error) {
        console.log(error)
        res.status(500).json({
            errorMessage: "Say Wuuuuut! Something went wrong."
        })
    }

})

module.exports = router;