const router = require("express").Router();
const UserModel = require('../models/User.model');


// NEED TO BE TESTED
router.post('/signup/category', async (req, res, next) => {
    
    const { _id, categories } = req.body;

    try {
        let response = await UserModel.findByIdAndUpdate(_id, {categories: categories})
        res.status(200).json(response)
    }
    catch(error) {
        res.status(500).json({
<<<<<<< HEAD
            errorMessage: "Hmm, are you sure you? Pleas try again!"
=======
            errorMessage: "Hmm, are you sure? Please try again!"
>>>>>>> dcd1951237a14cb7b64482ef87b269860547d546
        })
    }
});

module.exports = router;
