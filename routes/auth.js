const express = require('express');
const router = express.Router();

// GET api/auth
// Get logged in user
// Private

router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// POST api/auth
// Auth user & get token
// Public

router.post('/', (req, res) => {
  res.send('Login user');
});

module.exports = router;
