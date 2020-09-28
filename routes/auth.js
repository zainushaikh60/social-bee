const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route  GET api/auth
// @desc   GET logged in user
// @access Private

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  Post api/auth
// @desc   Auth user & get token
// @access Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
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
      res.status(500).send('Server Error');
    }
  }
);

// Get my profile

router.get('/my-profile/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get friend requests to

router.get('/friendRequestsTo', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.friendRequestsTo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get friend requests by

router.get('/friendRequestsBy', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.friendRequestsBy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get friends

router.get('/friends', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'friends',
      select: 'name avatar email',
    });
    res.json(user.friends);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get notifications

router.get('/notifications', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
