const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../util/config');
const { Session, User } = require('../models');

router.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.scope('withHash').findOne({ where: { username } });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' });
  }

  if (user.disabled) {
    return response.status(401).json({ error: 'account disabled, please contact admin' });
  }

  const token = jwt.sign({ username: user.username, id: user.id }, SECRET, {
    expiresIn: '1h',
  });

  await Session.create({ userId: user.id, token });

  return response
    .status(200)
    .json({ token, username: user.username, name: user.name });
});

module.exports = router;
