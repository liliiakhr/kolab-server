const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    },
    description: {
        type: String, 
        required: true
    },
    image_url: String,
    start: {
        type: String, 
        required: true
    },
    end: {
        type: String, 
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    groupOrigin: {
        type: Schema.Types.ObjectId,
        ref:'group'
    },
    users: [
        {type: Schema.Types.ObjectId, 
        ref: 'user'
    }],
});

const EventModel = model("event", eventSchema);

module.exports = EventModel;