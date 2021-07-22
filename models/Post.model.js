const { Schema, model } = require("mongoose");

const nestedCommentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    owner:{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'}],
    dislikes: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'}],
});


const postSchema = new Schema({
    image_url: String,
    title: {
        type: String,
        required: true},
    content: {
        type: String,
        required: true},
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'}],
    dislikes: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'}],
    comments: [nestedCommentSchema],
    groupOrigin: [{
        type: Schema.Types.ObjectId,
        ref:'group'}]
}, { timestamps: true });


const PostModel = model("Post", postSchema);

module.exports = PostModel;