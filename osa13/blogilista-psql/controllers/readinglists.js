const router = require('express').Router();

const { ReadingList } = require('../models');
const { tokenExtractor } = require('../util/middleware');

router.post('/', async (request, response) => {
  const { blogId, userId } = request.body;
  const reading = await ReadingList.create({ blogId, userId });

  response.status(201).json(reading);
});

router.put('/:id', tokenExtractor, async (request, response) => {
  const reading = await ReadingList.findByPk(request.params.id);

  if (!reading) {
    return response.status(404).json({ error: 'reading list entry not found' });
  }

  if (reading.userId !== request.user.id) {
    return response
      .status(401)
      .json({ error: 'only the owner can mark a blog as read' });
  }

  reading.read = request.body.read;
  await reading.save();

  return response.json(reading);
});

module.exports = router;
