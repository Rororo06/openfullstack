require('express-async-errors');
const express = require('express');

const authorsRouter = require('./controllers/authors');
const blogsRouter = require('./controllers/blogs');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const readingListsRouter = require('./controllers/readinglists');
const usersRouter = require('./controllers/users');
const { errorHandler, unknownEndpoint } = require('./util/middleware');

const app = express();

app.use(express.json());

app.use('/api/authors', authorsRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/readinglists', readingListsRouter);
app.use('/api/users', usersRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
