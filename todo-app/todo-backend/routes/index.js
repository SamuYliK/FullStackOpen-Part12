const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const redis = require('../redis')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++
  res.send({
    ...configs,
    visits
  });
});

/* Get statistics. */
router.get('/statistics', async (req, res) => {
  let todoIncrease = await redis.getAsync('counter');
  if (!todoIncrease) {
    todoIncrease = 0;
  }
  const addedTodos = { "added_todos": todoIncrease };
  res.send(addedTodos);
});

module.exports = router;
