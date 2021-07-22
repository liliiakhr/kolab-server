const { Schema, model } = require("mongoose");

const groupSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    image_url: String,
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
});

const GroupModel = model("Group", groupSchema);

module.exports = GroupModel;