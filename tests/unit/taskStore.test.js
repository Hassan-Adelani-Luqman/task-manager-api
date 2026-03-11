const store = require('../../src/store/taskStore');

beforeEach(() => {
  store.reset();
});

describe('taskStore - getAllTasks', () => {
  it('returns an empty array when no tasks exist', () => {
    expect(store.getAllTasks()).toEqual([]);
  });

  it('returns all created tasks', () => {
    store.createTask({ title: 'Task A' });
    store.createTask({ title: 'Task B' });
    expect(store.getAllTasks()).toHaveLength(2);
  });
});

describe('taskStore - createTask', () => {
  it('creates a task with the correct default fields', () => {
    const task = store.createTask({ title: 'My Task' });
    expect(task.id).toBe(1);
    expect(task.title).toBe('My Task');
    expect(task.description).toBe('');
    expect(task.status).toBe('pending');
    expect(task.createdAt).toBeDefined();
  });

  it('assigns incremental unique IDs', () => {
    const t1 = store.createTask({ title: 'First' });
    const t2 = store.createTask({ title: 'Second' });
    expect(t2.id).toBe(t1.id + 1);
  });

  it('stores the description when provided', () => {
    const task = store.createTask({ title: 'T', description: 'desc' });
    expect(task.description).toBe('desc');
  });
});

describe('taskStore - getTaskById', () => {
  it('returns the correct task for a valid ID', () => {
    const created = store.createTask({ title: 'Find Me' });
    const found = store.getTaskById(created.id);
    expect(found).toEqual(created);
  });

  it('returns null for a non-existent ID', () => {
    expect(store.getTaskById(999)).toBeNull();
  });
});

describe('taskStore - updateTask', () => {
  it('updates the title of an existing task', () => {
    const task = store.createTask({ title: 'Old Title' });
    const updated = store.updateTask(task.id, { title: 'New Title' });
    expect(updated.title).toBe('New Title');
  });

  it('updates status to a valid value', () => {
    const task = store.createTask({ title: 'T' });
    const updated = store.updateTask(task.id, { status: 'done' });
    expect(updated.status).toBe('done');
  });

  it('throws an error for an invalid status value', () => {
    const task = store.createTask({ title: 'T' });
    expect(() => store.updateTask(task.id, { status: 'flying' })).toThrow();
  });

  it('returns null for a non-existent ID', () => {
    expect(store.updateTask(999, { title: 'X' })).toBeNull();
  });
});

describe('taskStore - deleteTask', () => {
  it('removes a task and returns true', () => {
    const task = store.createTask({ title: 'Delete Me' });
    expect(store.deleteTask(task.id)).toBe(true);
    expect(store.getTaskById(task.id)).toBeNull();
  });

  it('returns false for a non-existent ID', () => {
    expect(store.deleteTask(999)).toBe(false);
  });
});
