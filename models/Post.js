const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  postText: {
    type: String,
    required: true,
  },
  postImage: {
    type: String,
  },
  postComments: [
    {
      commentText: String,
      required: true,
    },
    {
      commentBy: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
      required: true,
    },
  ],
  postLikes: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', PostSchema);
