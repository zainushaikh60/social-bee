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

PostSchema.pre('save', async function (next) {
  await this.populate({
    path: 'comments',
    populate: {
      path: 'user',
      model: 'User',
      select: 'name avatar profilePicture',
    },
  })
    .populate({
      path: 'user',
      model: 'User',
      select: 'name avatar profilePicture friends',
    })
    .execPopulate();
  next();
});

module.exports = mongoose.model('Post', PostSchema);
