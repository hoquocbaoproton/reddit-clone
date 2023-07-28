const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

const globalErrorHandler = require('./controllers/errorController');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const topicRoutes = require('./routes/topicRoutes');
const commentRoutes = require('./routes/commentRoutes');
const voteRoutes = require('./routes/voteRoutes');

const app = express();
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') ?? [
  'http://localhost:5173',
];

console.log(ALLOWED_ORIGINS);

app.use(morgan('dev'));

app.use(
  cors({
    origin: true,
    credentials: true,
    exposedHeaders: 'set-cookie',
  })
);

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 3) routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/topic', topicRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/vote', voteRoutes);

app.use(globalErrorHandler);

module.exports = app;
