const router = require("express").Router();
const GroupModel = require('../models/Group.model');

// NEED TO BE TESTED
router.get('/signup/group', async (req, res, next) => {

    // !! Is query the way to go here or do we have alternatives? !!
    const { categories } = req.query;

    try {
        //  This might cause bugs, categories might need to be put into an array
        let response = await GroupModel.find({ category: { $in: categories } }).limit(4)
        res.status(200).json(response)
    }
     catch(error) {
        res.status(500).json({
            errorMessage: 'You are not from Griffindor are you?'
        })
    }
});

router.post("/add-group", async (req, res, next) => {
    try {
        const { name, description, groupOrigin, image_url, category, tags } = req.body;
        let response = await GroupModel.create({ name, description, groupOrigin, image_url, category, tags })
        res.status(200).json(response)
    }
    catch(error) {
        res.status(500).json({
            errorMessage: "Something went wrong, please try again!",
            error: error
        })
    }
});

module.exports = router;
