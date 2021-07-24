const router = require("express").Router();
const GroupModel = require('../models/Group.model');

// NEED TO BE TESTED
router.get('/signup/group', async (req, res, next) => {
    const { categories } = req.query;
    
    try {
        console.log("IRUN ")
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
        const { name, description, image_url, category, tags, admin, users } = req.body;
        let group = await GroupModel.create({ name, description, image_url, category, tags, admin, users })
        res.status(200).json({group, successMessage: 'Congratulations! You are now a group admin'})
    }
    catch(error) {
        if(error.code === 1000){
            res.status(500).json({
                errorMessage: "That group already exists, sorry :(",
                error: error
            }) 
        }else{
        res.status(500).json({
            errorMessage: "Something went wrong, please try again!",
            error: error
        })
        }
    }
});

router.get('/groups', async (req, res , next) => {
    try {
        let response = await GroupModel.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            errorMessage: "Could not retrieve groups",
            error: error
        })
    }
})

module.exports = router;
