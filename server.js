const express = require('express');
const app = express();
const connectDB = require('./config/db');
const Auth = require('./routes/auth');
const Users = require('./routes/users');
const Posts = require('./routes/posts');

// Connect DB

connectDB();

// serving images in upload folder

app.use('/uploads', express.static('uploads'));

// Init Middleware

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to the Social-Bee API' }));

// Routes

app.use('/api/auth', Auth);
app.use('/api/users', Users);
app.use('/api/posts', Posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
