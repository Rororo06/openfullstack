const express = require('express');

const Todo = require('../models/Todo');
const { getAsync, setAsync } = require('../redis');

const router = express.Router();

const findTodo = async (request, response, next) => {
  const todo = await Todo.findById(request.params.id);

  if (!todo) {
    return response.status(404).json({ error: 'todo not found' });
  }

  request.todo = todo;
  next();
};

router.get('/', async (request, response) => {
  const todos = await Todo.find({});
  response.json(todos);
});

router.post('/', async (request, response) => {
  const todo = await Todo.create({
    text: request.body.text,
    done: false,
  });

  const added = Number(await getAsync('added_todos')) || 0;
  await setAsync('added_todos', added + 1);

  response.json(todo);
});

router.get('/:id', findTodo, (request, response) => {
  response.json(request.todo);
});

router.put('/:id', findTodo, async (request, response) => {
  const { text, done } = request.body;

  request.todo.text = text ?? request.todo.text;
  request.todo.done = done ?? request.todo.done;
  await request.todo.save();

  response.json(request.todo);
});

router.delete('/:id', findTodo, async (request, response) => {
  await request.todo.deleteOne();
  response.status(204).end();
});

module.exports = router;
