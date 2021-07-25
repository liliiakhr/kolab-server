const router = require ("express").Router();
const PostModel = require('../models/Post.model');

router.post('/post/comment', async (req, res, next) => {
    try {
        const { comment, postId } = req.body;
        let response = await PostModel.findByIdAndUpdate(postId, { $push: { comments: comment } }, {new: true})
                                        .populate('creator')
                                        .populate('comments.owner')
        console.log(response)
        res.status(200).json(response)
    }
     catch(error) {
        res.status(500).json({
            errorMessage: `Empty post... What's up with that?`
        })
    }
});

router.post('/post/likes', async (req, res, next) => {
    try {
        const { postOrCommentId, userId, type } = req.body;
        if (type === 'likes') {
            let response = await PostModel.findByIdAndUpdate(postOrCommentId, { $addToSet: { likes: userId }, $pull: { dislikes: userId } }, {new: true})
                                        .populate('creator')
                                        .populate('comments.owner')
            res.status(200).json(response)
        }
        if (type === 'dislikes') {
            let response = await PostModel.findByIdAndUpdate(postOrCommentId, { $pull: { likes: userId }, $addToSet: { dislikes: userId } }, {new: true})
                                        .populate('creator')
                                        .populate('comments.owner')
            res.status(200).json(response)
        }
    }
     catch(error) {
        res.status(500).json({
            errorMessage: "That didn't go as planned, please try again!"
        })
    }
});

// put ternary inside of route  pull / push

module.exports = router;