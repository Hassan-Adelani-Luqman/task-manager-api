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

// US-004: Update an existing task
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const task = store.updateTask(id, req.body);
    if (!task) {
      return res.status(404).json({ error: `Task with id ${id} not found` });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// US-005: Delete a task
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const deleted = store.deleteTask(id);
  if (!deleted) {
    return res.status(404).json({ error: `Task with id ${id} not found` });
  }
  res.status(204).send();
});

module.exports = router;
