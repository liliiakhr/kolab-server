const router = require("express").Router();
const GroupModel = require('../models/Group.model');

// NEED TO BE TESTED
router.get('/signup/group', async (req, res, next) => {
    const { categories } = req.query;
    
    try {
        // Finds the groups for the user categories
        // If less than 4 are found, 4 random ones and add those to the groups found earlier
        let suggestedGroups = [];
        let userGroups = await GroupModel.find({ category: { $in: categories } }).limit(4)
        if (userGroups.length < 4) {
            let randomGroups = await GroupModel.aggregate([{ $sample: { size: 4 }}])
            
            suggestedGroups = [...userGroups, ...randomGroups]

            // ?? How can we do this easier?
            let names = [];
            let newGroups = [];
            for (let i = 0; i < suggestedGroups.length; i++) {
                if (!names.includes(suggestedGroups[i].name)) {
                    names.push(suggestedGroups[i].name)
                    newGroups.push(suggestedGroups[i])
                }
            }
            res.status(200).json(newGroups.splice(0, 4))
        }
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
