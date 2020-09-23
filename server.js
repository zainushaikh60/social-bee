const express = require('express');
const app = express();
const Auth = require('./routes/auth');
const Users = require('./routes/users');
const Posts = require('./routes/posts');

app.get('/', (req, res) => res.json({ msg: 'Welcome to the Social-Bee API' }));

// Routes

app.use('/api/auth', Auth);
app.use('/api/users', Users);
app.use('/api/posts', Posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
