const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const config = require('config');
const normalize = require('normalize');
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

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        }),
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

    if (requestSender.id === requestReciever.id) {
      return res
        .status(400)
        .json({ msg: 'You can not send friend request to yourself' });
    } else if (
      requestSender.friends.length > 0 &&
      requestSender.friends.map(
        (friend) => friend.toString === requestReciever.id
      )
    ) {
      return res
        .status(400)
        .json({ msg: 'You can not send friend request to your friend' });
    } else if (
      requestSender.friendRequestsTo.length > 0 &&
      requestSender.friendRequestsTo.map(
        (friendRqTo) => friendRqTo.toString === requestReciever.id
      )
    ) {
      return res
        .status(400)
        .json({ msg: 'You have already sent this user a friend request' });
    } else if (
      requestSender.friendRequestsBy.length > 0 &&
      requestSender.friendRequestsBy.map(
        (friendRqBy) => friendRqBy.toString === requestReciever.id
      )
    ) {
      return res
        .status(400)
        .json({ msg: 'This user have already sent you a friend request' });
    } else {
      requestReciever.friendRequestsBy.unshift(requestSender.id);
      requestSender.friendRequestsTo.unshift(requestReciever.id);

      requestReciever.notifications.unshift({
        notification: `You have recieved a friend request from ${requestSender.name}`,
        user: requestSender.id,
      });

      await requestReciever.save();
      await requestSender.save();

      res.json(requestSender.friendRequestsTo);
    }
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
      const indexOfRequestCanceler = requestWasSentTo.friendRequestsBy
        .map((friendRqBy) => friendRqBy.toString() === requestCanceler.id)
        .indexOf(requestCanceler.id);

      const indexOfRequestWasSentTo = requestCanceler.friendRequestsTo
        .map((friendRqTo) => friendRqTo.toString() === requestWasSentTo.id)
        .indexOf(requestWasSentTo.id);

      const indexOfRequestCancelerInNotifications = requestWasSentTo.notifications
        .map(
          (notification) => notification.user.toString() === requestCanceler.id
        )
        .indexOf(requestCanceler.id);

      requestWasSentTo.friendRequestsBy.splice(indexOfRequestCanceler, 1);
      requestCanceler.friendRequestsTo.splice(indexOfRequestWasSentTo, 1);
      requestWasSentTo.notifications.splice(
        indexOfRequestCancelerInNotifications,
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
      const indexOfSenderId = requestAcceptor.friendRequestsBy
        .map((friendRqBy) => friendRqBy.toString() === requestSender.id)
        .indexOf(requestSender.id);

      const indexOfRecieverId = requestSender.friendRequestsTo
        .map((friendRqBy) => friendRqBy.toString() === requestSender.id)
        .indexOf(requestAcceptor.id);

      const indexOfRequestSenderIdInNotifications = requestAcceptor.notifications
        .map(
          (notification) => notification.user.toString() === requestSender.id
        )
        .indexOf(requestSender.id);

      requestAcceptor.friendRequestsBy.splice(indexOfSenderId, 1);
      requestSender.friendRequestsTo.splice(indexOfRecieverId, 1);
      requestAcceptor.notifications.splice(
        indexOfRequestSenderIdInNotifications,
        1
      );

      requestAcceptor.friends.push(requestSender.id);
      requestSender.friends.push(requestAcceptor.id);

      await requestAcceptor.save();
      await requestSender.save();

      res.json(requestAcceptor.friends);
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
      const indexOfRequestSender = requestRejector.friendRequestsBy
        .map((friendRqBy) => friendRqBy.toString() === requestSender.id)
        .indexOf(requestSender.id);

      const indexOfRequestRejector = requestSender.friendRequestsTo
        .map((friendRqTo) => friendRqTo.toString() === requestRejector.id)
        .indexOf(requestRejector.id);

      const indexOfRequestSenderIdInNotifications = requestRejector.notifications
        .map(
          (notification) => notification.user.toString() === requestSender.id
        )
        .indexOf(requestSender.id);

      requestRejector.friendRequestsBy.splice(indexOfRequestSender, 1);
      requestSender.friendRequestsTo.splice(indexOfRequestRejector, 1);
      requestRejector.notifications.splice(
        indexOfRequestSenderIdInNotifications,
        1
      );

      await requestSender.save();
      await requestRejector.save();

      res.json(requestRejector.friendRequestsBy);
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
      const indexOfTarget = remover.friends
        .map((friend) => friend.toString() === target.id)
        .indexOf(target.id);

      const indexOfRemover = target.friends
        .map((friend) => friend.toString() === remover.id)
        .indexOf(remover.id);

      remover.friends.splice(indexOfTarget, 1);
      target.friends.splice(indexOfRemover, 1);

      await remover.save();
      await target.save();

      res.json(remover.friends);
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
