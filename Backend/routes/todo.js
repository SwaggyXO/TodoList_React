const express = require('express');
const router = express.Router();

const {getAll, createTodo, getOneTodo, updateTodo, deleteTodo} = require('../controllers/todo')

router.route('/').get(getAll).post(createTodo)
router.route('/:todoID').get(getOneTodo).patch(updateTodo).delete(deleteTodo)

module.exports = router;