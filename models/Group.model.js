const { Schema, model } = require("mongoose");
const url = 'https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80'

const groupSchema = new Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    },
    image_url: {
        type: String,
        default: url
    },
    description: {
        type: String, 
        required: true
    },
    category: {
        type: String, 
        enum: ['art', 'sports', 'science', 'lifestyle', 'nature', 'politics', 'entertainment', 'magic', 'other']
    },
    tags: [String],
    admin: {type: Schema.Types.ObjectId, ref: 'user'},
    users: [{type: Schema.Types.ObjectId, ref: 'user'}],
    postCount: {
        type: Number,
        default: 0
    }
});

const GroupModel = model("group", groupSchema);

module.exports = GroupModel;