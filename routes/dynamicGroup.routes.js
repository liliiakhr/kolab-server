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

router.post('/posts', async (req, res, next) => {
    const { id } = req.body;
    try {
        let postData = await PostModel.find({groupOrigin: id}).populate('creator')
        res.status(200).json(postData)
    }
    catch(error) {
        res.status(500).json({
            errorMessage: "Seems there are no posts in this group."
        })
    }
})

router.post('/:group/add-post', async (req, res, next) => {
    
    try {
        const { title, content, creator, groupOrigin, image_url} = req.body;
        let groupData = await PostModel.create({ title, content, creator, groupOrigin, image_url })
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

router.post('/join-group', async (req, res, next) => {
    try {
        const { groupId, userId } = req.body;
        let groupData = await GroupModel.findByIdAndUpdate(groupId, { $push: { users: userId } }, {new: true})
        res.status(200).json(groupData)
    }
    catch(error) {
        res.status(500).json({
            errorMessage: "Something went wrong, please try again!"
        })
    }
})

router.post('/leave-group', async (req, res, next) => {
    try {
        const { groupId, userId } = req.body;
        let groupData = await GroupModel.findByIdAndUpdate(groupId, { $pull: { users: userId } }, {new: true})
        res.status(200).json(groupData)
    }
    catch(error) {
        res.status(500).json({
            errorMessage: "Something went wrong, please try again!"
        })
    }
})

router.patch('/edit-group', async (req, res, next) => {
    try {
        const { _id, name, description, tags, category, image_url, admin, users, postCount } = req.body;
        let groupData = await GroupModel.findByIdAndUpdate(_id, { name, description, tags, category, image_url, admin, users, postCount }, {new: true})
        res.status(200).json(groupData)
    }
    catch(error) {
        res.status(500).json({
            errorMessage: "Sawry, we could not update your data... Please try again!"
        })
    }
})


module.exports = router;