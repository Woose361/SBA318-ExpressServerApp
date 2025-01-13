const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  title: { type: "User", required: true },
  body: { type: "UserId", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
