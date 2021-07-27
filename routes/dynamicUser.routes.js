const router = require("express").Router();
// const GroupModel = require('../models/Group.model');
const {isLoggedIn} = require('../middlewares/middlewares');
const PostModel = require("../models/Post.model");
const UserModel = require("../models/User.model");


router.get('/profile/:id', isLoggedIn, async (req, res, next) => {
    try {
        const {id} = req.params;
        let user = await UserModel.findById(id)
            .populate("posts");
        res.status(200).json(user);
    }
    catch(error) {
        res.status(500).json({
            errorMessage: "There has been some problem fetching the user."
        });
    }
})

module.exports = router;