const jwt = require('jsonwebtoken');

const { SECRET } = require('./config');
const { Session, User } = require('../models');

const tokenExtractor = async (request, response, next) => {
  const authorization = request.get('authorization');

  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return response.status(401).json({ error: 'token missing' });
  }

  const token = authorization.substring(7);
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, SECRET);
  } catch {
    return response.status(401).json({ error: 'token invalid' });
  }

  const session = await Session.findOne({ where: { token } });

  if (!session) {
    return response.status(401).json({ error: 'session expired, please log in again' });
  }

  const user = await User.findByPk(decodedToken.id);

  if (!user || user.disabled) {
    await Session.destroy({ where: { userId: decodedToken.id } });
    return response.status(401).json({ error: 'account disabled, please contact admin' });
  }

  request.token = token;
  request.user = user;
  return next();
};

const errorHandler = (error, request, response, next) => {
  if (
    error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    return response
      .status(400)
      .json({ error: error.errors.map(item => item.message) });
  }

  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).json({ error: error.message });
  }

  return next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' });
};

module.exports = { errorHandler, tokenExtractor, unknownEndpoint };
