const express = require('express');
const app = express();

const requestLogger = require('./middleware/logger');
const tasksRouter = require('./routes/tasks');
const healthRouter = require('./routes/health');

app.use(express.json());
app.use(requestLogger);

app.use('/tasks', tasksRouter);
app.use('/health', healthRouter);

module.exports = app;
