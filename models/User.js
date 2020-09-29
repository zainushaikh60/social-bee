const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  cover: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  friendRequestsTo: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  friendRequestsBy: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  notifications: [
    {
      notification: { type: String },
      user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  await this.populate({
    path: 'friends',
    select: 'name email avatar',
  })
    .populate({
      path: 'notifications',
      populate: {
        path: 'user',
        select: 'avatar',
      },
    })
    .execPopulate();
  next();
});

module.exports = mongoose.model('User', UserSchema);
