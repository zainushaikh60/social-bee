const express = require('express');
const router = express.Router();

// GET api/posts
// Get all posts
// Private

router.get('/', (req, res) => {
  res.send('Get all posts');
});

// POST api/posts
// Add new post
// Private

router.post('/', (req, res) => {
  res.send('Add post');
});

// PUT api/posts/:id
// Update post
// Private

router.put('/:id', (req, res) => {
  res.send('Add post');
});

// DELETE api/posts:id
// Delete post
// Private

router.delete('/:id', (req, res) => {
  res.send('Delete post  ');
});

module.exports = router;
