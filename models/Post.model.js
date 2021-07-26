const { Schema, model } = require("mongoose");

const nestedCommentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    owner:{
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'}],
    dislikes: [{
        type: Schema.Types.ObjectId, 
        ref: 'user'}],
    createdAt: String
});


const postSchema = new Schema({
    image_url: String,
    title: {
        type: String,
        required: true},
    content: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'}],
    dislikes: [{
        type: Schema.Types.ObjectId, 
        ref: 'user'}],
    comments: [nestedCommentSchema],
    groupOrigin: {
        type: Schema.Types.ObjectId,
        ref:'group'}
}, { timestamps: true });


const PostModel = model("post", postSchema);

module.exports = PostModel;