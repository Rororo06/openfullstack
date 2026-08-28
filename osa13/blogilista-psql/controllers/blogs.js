const router = require('express').Router();
const { Op } = require('sequelize');

const { Blog, User } = require('../models');
const { tokenExtractor } = require('../util/middleware');

const blogFinder = async (request, response, next) => {
  request.blog = await Blog.findByPk(request.params.id);

  if (!request.blog) {
    return response.status(404).json({ error: 'blog not found' });
  }

  return next();
};

router.get('/', async (request, response) => {
  const where = {};

  if (request.query.search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${request.query.search}%` } },
      { author: { [Op.iLike]: `%${request.query.search}%` } },
    ];
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: { model: User, attributes: ['name', 'username'] },
    where,
    order: [['likes', 'DESC']],
  });

  response.json(blogs);
});

router.post('/', tokenExtractor, async (request, response) => {
  const blog = await Blog.create({ ...request.body, userId: request.user.id });
  response.status(201).json(blog);
});

router.get('/:id', blogFinder, async (request, response) => {
  response.json(request.blog);
});

router.put('/:id', blogFinder, async (request, response) => {
  request.blog.likes = request.body.likes;
  await request.blog.save();
  response.json(request.blog);
});

router.delete('/:id', tokenExtractor, blogFinder, async (request, response) => {
  if (request.blog.userId !== request.user.id) {
    return response.status(401).json({ error: 'only the creator can delete a blog' });
  }

  await request.blog.destroy();
  return response.status(204).end();
});

module.exports = router;
