const { Schema, model, Mongoose } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    default: '/somewhere/someimage',
  },
  description: {
    type: String,
    default: 'Hey welcome to my Kolab profile',
  },
  categories: [{
    type: String, 
    enum: ['art', 'sports', 'science', 'lifestyle', 'nature', 'politics', 'entertainment','magic', 'other']
  }],
  groupNames: [String],
  groups: [{
    type: Schema.Types.ObjectId,
     ref: 'group'
}],
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'post'
}],
  friends: [{
    type: Schema.Types.ObjectId,
     ref: 'user'
}],
  friendRequests: new Schema({
    userIds: [{type: Schema.Types.ObjectId, ref:'user'}]
  }, {timestamps:true}),
  // update on sign in
  lastLogin: {
    type: Date,
    default: new Date()
  }
});

const User = model("user", userSchema);

module.exports = User;
