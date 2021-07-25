const router = require ("express").Router();
const PostModel = require('../models/Post.model');

router.post('/post/comment', async (req, res, next) => {
    try {
        const { comment, postId } = req.body;
        let response = await PostModel.findByIdAndUpdate(postId, { $push: { comments: comment } }, {new: true})
                                        .populate('creator')
                                        .populate('comments.owner')
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
        const { type, action, postOrCommentId, userId } = req.body;
        if (action === 'likes' && type === "post") {
            let response = await PostModel.findByIdAndUpdate(postOrCommentId, { $addToSet: { likes: userId }, $pull: { dislikes: userId } }, {new: true})
                                        .populate('creator')
                                        .populate('comments.owner')
            res.status(200).json(response)
        }
        if (action === 'dislikes' && type === "post") {
            let response = await PostModel.findByIdAndUpdate(postOrCommentId, { $pull: { likes: userId }, $addToSet: { dislikes: userId } }, {new: true})
                                        .populate('creator')
                                        .populate('comments.owner')
            res.status(200).json(response)
        }
        if (action === 'likes' && type === "comment") {
            let response = await PostModel.findOneAndUpdate({ "comments._id": postOrCommentId }, { $addToSet: { "comments.$.likes": userId }, $pull: { "comments.$.dislikes": userId } }, {new: true})
                                        .populate('creator')
                                        .populate('comments.owner')
            res.status(200).json(response)
        }
        if (action === 'dislikes' && type === "comment") {
            let response = await PostModel.findOneAndUpdate({ "comments._id": postOrCommentId }, { $pull: { "comments.$.likes": userId }, $addToSet: { "comments.$.dislikes": userId } }, {new: true})
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

module.exports = router;