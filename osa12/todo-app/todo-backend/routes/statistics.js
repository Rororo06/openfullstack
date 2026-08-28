const express = require('express');

const { getAsync } = require('../redis');

const router = express.Router();

router.get('/', async (request, response) => {
  const added = Number(await getAsync('added_todos')) || 0;
  response.json({ added_todos: added });
});

module.exports = router;
