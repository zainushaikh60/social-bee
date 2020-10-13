const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const fs = require('fs');
const User = require('../models/User');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir('./uploads/', (err) => {
      cb(null, './uploads/');
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

// Upload profile picture

router.post(
  '/uploadProfilePicture',
  auth,
  upload.single('profilePicture'),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      user.profilePicture = req.file.path;
      await user.save();
      return res.json(user.profilePicture);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// delete profile picture

router.put('/deleteProfilePicture', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.profilePicture === null) {
      return res.status(400).json({ msg: 'No profile picture found' });
    } else {
      user.profilePicture = null;
      await user.save();
    }

    return res.json(user.profilePicture);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Upload cover picture

router.post(
  '/uploadCoverPhoto',
  auth,
  upload.single('cover'),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      user.cover = req.file.path;
      await user.save();
      return res.json(user.cover);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.put('/deleteCoverPhoto', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.cover === null) {
      return res.status(400).json({ msg: 'No cover photo found' });
    } else {
      user.cover = null;
      await user.save();
    }

    return res.json(user.cover);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get my profile

router.get('/my-profile/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get profile picture

router.get('/profile-picture', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.json(user.profilePicture);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get cover photo

router.get('/cover-photo', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.json(user.cover);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get friend requests to

router.get('/friendRequestsTo', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.json(user.friendRequestsTo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get friend requests by

router.get('/friendRequestsBy', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.json(user.friendRequestsBy);
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
      select: 'name avatar profilePicture email',
    });
    return res.json(user.friends);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get notifications

router.get('/notifications', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'notifications',
      populate: { path: 'user', select: 'avatar profilePicture' },
    });
    return res.json(user.notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
