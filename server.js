const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');
const Auth = require('./routes/auth');
const Users = require('./routes/users');
const Posts = require('./routes/posts');

// Connect DB

connectDB();

// serving images from upload folder

app.use('/uploads', express.static('uploads'));

// Init Middleware

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes

app.use('/api/auth', Auth);
app.use('/api/users', Users);
app.use('/api/posts', Posts);

//

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
