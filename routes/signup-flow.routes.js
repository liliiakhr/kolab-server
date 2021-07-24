const router = require("express").Router();
const UserModel = require('../models/User.model');


// NEED TO BE TESTED
router.post('/signup/category', async (req, res, next) => {
    
    const { _id, categories } = req.body;

    try {
        let response = await UserModel.findByIdAndUpdate(_id, {categories: categories}, {new: true})
        res.status(200).json(response)
    }
    catch(error) {
        res.status(500).json({
            errorMessage: "Hmm, are you sure? Please try again!"
        })
    }
});

module.exports = router;
