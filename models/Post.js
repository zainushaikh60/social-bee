const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
      },
      text: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      profilePicture: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', PostSchema);
