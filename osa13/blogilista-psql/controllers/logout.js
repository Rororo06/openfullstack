const router = require('express').Router();

const { Session } = require('../models');
const { tokenExtractor } = require('../util/middleware');

router.delete('/', tokenExtractor, async (request, response) => {
  await Session.destroy({ where: { token: request.token } });
  response.status(204).end();
});

module.exports = router;
