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
  password: {
    type: String,
    required: true,
  },
  friends: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  friendRequestsTo: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  friendRequestsBy: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  notifications: [{ type: String }],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
