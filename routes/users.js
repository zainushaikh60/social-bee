const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const config = require('config');
const gravatar = require('gravatar');
const multer = require('multer');
const fs = require('fs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir('./uploads/profile-pictures/', (err) => {
      cb(null, './uploads/profile-pictures/');
    });
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only jpeg and png files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

// @route  Post api/users
// @desc   Register a user
// @access Public

router.post(
  '/',
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid Email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      const avatar = gravatar.url(
        email,
        {
          s: '200',
          r: 'pg',
          d: 'mm',
        },
        { forceHttps: true }
      );

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Get all users

router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password -date -__v');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user profile

router.get('/profile/:id', auth, async (req, res) => {
  try {
    const user = await User.findById('name friends email');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Upload profile picture

router.post(
  '/uploadProfilePicture',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      user.avatar = req.file.path;

      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Send friend request

router.put('/:id/sendFriendRequest', auth, async (req, res) => {
  try {
    const requestSender = await User.findById(req.user.id);
    const requestReciever = await User.findById(req.params.id);

    if (requestSender.id === req.params.id) {
      return res
        .status(400)
        .json({ msg: 'You can not send friend request to yourself ' });
    }

    if (
      requestSender.friends.length > 0 &&
      requestSender.friends.toString() === requestReciever.id
    ) {
      return res
        .status(400)
        .json({ msg: 'You can not send friend request to your friend' });
    } else if (
      requestSender.friendRequestsTo.length > 0 &&
      requestSender.friendRequestsTo.toString() === requestReciever.id
    ) {
      return res
        .status(400)
        .json({ msg: 'You have already sent this user a friend request' });
    } else if (
      requestSender.friendRequestsBy.length > 0 &&
      requestSender.friendRequestsBy.toString() === requestReciever.id
    ) {
      return res.status(400).json({
        msg: 'This user have already sent you a friend request',
      });
    } else {
      requestReciever.friendRequestsBy.unshift(requestSender.id);
      requestSender.friendRequestsTo.unshift(requestReciever.id);
      requestReciever.notifications.unshift({
        notification: `You have recieved a friend request from ${requestSender.name}`,
        user: requestSender.id,
      });
      await requestReciever.save();
      await requestSender.save();
    }

    return res.json(requestSender.friendRequestsTo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Cancel friend request

router.put('/:id/cancelFriendRequest', auth, async (req, res) => {
  try {
    const requestCanceler = await User.findById(req.user.id);
    const requestWasSentTo = await User.findById(req.params.id);

    if (
      requestCanceler.friendRequestsTo.filter(
        (friendRqTo) => friendRqTo.toString() === requestWasSentTo.id
      ).length > 0
    ) {
      requestWasSentTo.friendRequestsBy.splice(
        requestWasSentTo.friendRequestsBy.findIndex(
          (friendRequestBy) => friendRequestBy.toString() === requestCanceler.id
        ),
        1
      );

      requestCanceler.friendRequestsTo.splice(
        requestCanceler.friendRequestsTo.findIndex(
          (friendRequestTo) =>
            friendRequestTo.toString() === requestWasSentTo.id
        ),
        1
      );

      requestWasSentTo.notifications.splice(
        requestWasSentTo.notifications.findIndex(
          (notification) =>
            notification.user._id.toString() === requestCanceler.id
        ),
        1
      );

      await requestCanceler.save();
      await requestWasSentTo.save();

      res.json(requestCanceler.friendRequestsTo);
    } else {
      return res.status(400).json({ msg: 'No friend requests to this user' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Accept friend request

router.put('/:id/acceptFriendRequest', auth, async (req, res) => {
  try {
    const requestAcceptor = await User.findById(req.user.id);
    const requestSender = await User.findById(req.params.id);

    if (
      requestAcceptor.friendRequestsBy.filter(
        (friendRqBy) => friendRqBy.toString() === requestSender.id
      ).length > 0
    ) {
      requestAcceptor.friendRequestsBy.splice(
        requestAcceptor.friendRequestsBy.findIndex(
          (friendRequestBy) => friendRequestBy.toString() === requestSender.id
        ),
        1
      );

      requestSender.friendRequestsTo.splice(
        requestSender.friendRequestsTo.findIndex(
          (friendRequestTo) => friendRequestTo.toString() === requestAcceptor.id
        ),
        1
      );

      requestAcceptor.notifications.splice(
        requestAcceptor.notifications.findIndex(
          (notification) =>
            notification.user._id.toString() === requestSender.id
        ),
        1
      );

      requestAcceptor.friends.push(requestSender.id);
      requestSender.friends.push(requestAcceptor.id);

      await requestAcceptor.save();
      await requestSender.save();

      return res.json({
        friends: requestAcceptor.friends,
        friendRequestsBy: requestAcceptor.friendRequestsBy,
        notifications: requestAcceptor.notifications,
      });
    } else {
      return res.status(400).json({ msg: 'No friend request by this user' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Reject friend request

router.put('/:id/rejectFriendRequest', auth, async (req, res) => {
  try {
    const requestRejector = await User.findById(req.user.id);
    const requestSender = await User.findById(req.params.id);

    if (
      requestRejector.friendRequestsBy.filter(
        (friendRqBy) => friendRqBy.toString() === requestSender.id
      ).length > 0
    ) {
      requestRejector.friendRequestsBy.splice(
        requestRejector.friendRequestsBy.findIndex(
          (friendRequestBy) => friendRequestBy.toString() === requestSender.id
        ),
        1
      );

      requestSender.friendRequestsTo.splice(
        requestSender.friendRequestsTo.findIndex(
          (friendRequestTo) => friendRequestTo.toString() === requestRejector.id
        ),
        1
      );

      requestRejector.notifications.splice(
        requestRejector.notifications.findIndex(
          (notification) =>
            notification.user._id.toString() === requestSender.id
        ),
        1
      );

      await requestSender.save();
      await requestRejector.save();

      return res.json({
        friendRequestsBy: requestRejector.friendRequestsBy,
        notifications: requestRejector.notifications,
      });
    } else {
      return res.status(400).json({ msg: 'No friend request by this user' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Remove friend

router.put('/:id/removeFriend', auth, async (req, res) => {
  try {
    const remover = await User.findById(req.user.id);
    const target = await User.findById(req.params.id);

    if (
      remover.friends.filter((friend) => friend.toString() === target.id)
        .length > 0
    ) {
      remover.friends.splice(
        remover.friends.findIndex((friend) => friend.toString() === target.id),
        1
      );

      target.friends.splice(
        target.friends.findIndex((friend) => friend.toString() === remover.id),
        1
      );

      await remover.save();
      await target.save();

      return res.json(remover.friends);
    } else {
      return res
        .status(400)
        .json({ msg: 'You are not friends with this user' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
