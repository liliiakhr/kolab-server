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
    default: 'https://assets.3dtotal.com/data-import/data/images/tutorials/2513-tid-albert-einstein-rendering-jpg.e0iif8.image.45x.jpg',
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
  friendRequests:[{type: Schema.Types.ObjectId, ref:'user'}],
  lastLogin: {
    type: Date,
    default: new Date()
  } 
});

const User = model("user", userSchema);

module.exports = User;
