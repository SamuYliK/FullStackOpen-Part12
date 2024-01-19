const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const redis = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  // Increase Redis counter by one
  let counter = await redis.getAsync('counter');
  if (counter) {
    counter = Number(counter) + 1;
  } else {
    counter = 1;
  }
  await redis.setAsync('counter', counter)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const id = req.todo._id
  const todo = await Todo.findById(id)
  res.send(todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const id = req.todo._id
  const { text, done } = req.body
  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { text, done },
    { new: true, runValidators: true, context: 'query' }
  )
  res.send(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router;
