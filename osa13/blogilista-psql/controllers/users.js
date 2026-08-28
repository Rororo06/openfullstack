const router = require('express').Router();
const bcrypt = require('bcrypt');

const { Blog, Session, User } = require('../models');
const { tokenExtractor } = require('../util/middleware');

router.get('/', async (request, response) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  });

  response.json(users);
});

router.get('/:id', async (request, response) => {
  const through = { as: 'readinglists', attributes: ['id', 'read'] };

  if (request.query.read) {
    through.where = { read: request.query.read === 'true' };
  }

  const user = await User.findByPk(request.params.id, {
    include: {
      model: Blog,
      as: 'readings',
      attributes: { exclude: ['userId'] },
      through,
    },
  });

  if (!user) {
    return response.status(404).json({ error: 'user not found' });
  }

  return response.json(user);
});

router.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!password || password.length < 6) {
    return response
      .status(400)
      .json({ error: 'password must be at least 6 characters long' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const { id } = await User.create({ username, name, passwordHash });
  const created = await User.findByPk(id);

  return response.status(201).json(created);
});

router.put('/:username', async (request, response) => {
  const user = await User.findOne({
    where: { username: request.params.username },
  });

  if (!user) {
    return response.status(404).json({ error: 'user not found' });
  }

  user.username = request.body.username;
  await user.save();

  return response.json(user);
});

router.put('/:username/disabled', tokenExtractor, async (request, response) => {
  if (!request.user.admin) {
    return response.status(401).json({ error: 'admin privileges required' });
  }

  const user = await User.findOne({
    where: { username: request.params.username },
  });

  if (!user) {
    return response.status(404).json({ error: 'user not found' });
  }

  user.disabled = request.body.disabled;
  await user.save();

  if (user.disabled) {
    await Session.destroy({ where: { userId: user.id } });
  }

  return response.json(user);
});

module.exports = router;
