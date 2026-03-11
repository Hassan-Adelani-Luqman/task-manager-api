let tasks = [];
let nextId = 1;

const VALID_STATUSES = ['pending', 'in-progress', 'done'];

function getAllTasks() {
  return [...tasks];
}

function getTaskById(id) {
  return tasks.find((t) => t.id === id) || null;
}

function createTask({ title, description = '' }) {
  const task = {
    id: nextId++,
    title,
    description,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

function updateTask(id, updates) {
  const task = getTaskById(id);
  if (!task) return null;

  if (updates.status && !VALID_STATUSES.includes(updates.status)) {
    throw new Error(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  if (updates.title !== undefined) task.title = updates.title;
  if (updates.description !== undefined) task.description = updates.description;
  if (updates.status !== undefined) task.status = updates.status;

  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

function reset() {
  tasks = [];
  nextId = 1;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  reset,
  VALID_STATUSES,
};
