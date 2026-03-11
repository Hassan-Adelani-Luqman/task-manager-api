const express = require('express');
const router = express.Router();
const store = require('../store/taskStore');

// US-001: Get all tasks
router.get('/', (req, res) => {
  res.status(200).json(store.getAllTasks());
});

// US-003: Get a single task by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = store.getTaskById(id);
  if (!task) {
    return res.status(404).json({ error: `Task with id ${id} not found` });
  }
  res.status(200).json(task);
});

// US-002: Create a new task
router.post('/', (req, res) => {
  const { title, description } = req.body;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'title is required and must be a non-empty string' });
  }
  const task = store.createTask({ title: title.trim(), description });
  res.status(201).json(task);
});

module.exports = router;
