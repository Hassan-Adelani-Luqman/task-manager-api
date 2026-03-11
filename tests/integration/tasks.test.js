const request = require('supertest');
const app = require('../../src/app');
const store = require('../../src/store/taskStore');

beforeEach(() => {
  store.reset();
});

describe('GET /tasks', () => {
  it('returns 200 and an empty array when no tasks exist', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('returns 200 and all tasks', async () => {
    store.createTask({ title: 'Task 1' });
    store.createTask({ title: 'Task 2' });
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

describe('POST /tasks', () => {
  it('creates a task and returns 201', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'New Task', description: 'Details here' });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe('New Task');
    expect(res.body.status).toBe('pending');
  });

  it('returns 400 when title is missing', async () => {
    const res = await request(app).post('/tasks').send({ description: 'no title' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('returns 400 when title is an empty string', async () => {
    const res = await request(app).post('/tasks').send({ title: '   ' });
    expect(res.status).toBe(400);
  });
});

describe('GET /tasks/:id', () => {
  it('returns 200 and the task for a valid ID', async () => {
    const task = store.createTask({ title: 'Find Me' });
    const res = await request(app).get(`/tasks/${task.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(task.id);
    expect(res.body.title).toBe('Find Me');
  });

  it('returns 404 for a non-existent ID', async () => {
    const res = await request(app).get('/tasks/9999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

describe('PUT /tasks/:id', () => {
  it('updates and returns the task with 200', async () => {
    const task = store.createTask({ title: 'Old' });
    const res = await request(app)
      .put(`/tasks/${task.id}`)
      .send({ title: 'New', status: 'in-progress' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('New');
    expect(res.body.status).toBe('in-progress');
  });

  it('returns 400 for an invalid status', async () => {
    const task = store.createTask({ title: 'T' });
    const res = await request(app)
      .put(`/tasks/${task.id}`)
      .send({ status: 'invalid-status' });
    expect(res.status).toBe(400);
  });

  it('returns 404 for a non-existent ID', async () => {
    const res = await request(app).put('/tasks/9999').send({ title: 'X' });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /tasks/:id', () => {
  it('deletes a task and returns 204', async () => {
    const task = store.createTask({ title: 'Delete Me' });
    const res = await request(app).delete(`/tasks/${task.id}`);
    expect(res.status).toBe(204);
  });

  it('confirms the task is gone after deletion', async () => {
    const task = store.createTask({ title: 'Gone' });
    await request(app).delete(`/tasks/${task.id}`);
    const res = await request(app).get(`/tasks/${task.id}`);
    expect(res.status).toBe(404);
  });

  it('returns 404 for a non-existent ID', async () => {
    const res = await request(app).delete('/tasks/9999');
    expect(res.status).toBe(404);
  });
});
