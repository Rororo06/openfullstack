require('express-async-errors');
const express = require('express');

const { connect } = require('./mongo');
const statisticsRouter = require('./routes/statistics');
const todosRouter = require('./routes/todos');
const { PORT } = require('./util/config');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send('ok');
});

app.use('/todos', todosRouter);
app.use('/statistics', statisticsRouter);

app.use((error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
});

connect().then(() => {
  app.listen(PORT, () => console.log(`Started on port ${PORT}`));
});
