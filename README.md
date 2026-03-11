# Task Manager API

A lightweight RESTful Task Manager API built with Node.js and Express, developed as part of an Agile/DevOps assessment across two simulated sprints.

## Getting Started

**Prerequisites:** Node.js 20+

```bash
npm install
npm start              # runs on http://localhost:3000
npm test               # run all tests
npm run test:coverage  # run tests with coverage report
```

## API Endpoints

| Method | Path          | Description             |
|--------|---------------|-------------------------|
| GET    | /tasks        | Retrieve all tasks      |
| POST   | /tasks        | Create a new task       |
| GET    | /tasks/:id    | Retrieve a single task  |
| PUT    | /tasks/:id    | Update an existing task |
| DELETE | /tasks/:id    | Delete a task           |
| GET    | /health       | Health check            |

## Task Object

```json
{
  "id": 1,
  "title": "Write unit tests",
  "description": "Cover the task store module",
  "status": "pending",
  "createdAt": "2026-03-11T10:00:00.000Z"
}
```

Valid `status` values: `pending` | `in-progress` | `done`

## Running the CI Pipeline

This project uses GitHub Actions. The pipeline triggers on every push to `main` and every pull request, running the full test suite with coverage.

## Project Docs

- [Product Backlog](docs/sprint0/product-backlog.md)
- [Sprint 1 Plan](docs/sprint0/sprint1-plan.md)
- [Sprint 2 Plan](docs/sprint0/sprint2-plan.md)
- [Sprint 1 Review](docs/sprint1/sprint-review.md)
- [Sprint 1 Retrospective](docs/sprint1/retrospective.md)
- [Sprint 2 Review](docs/sprint2/sprint-review.md)
- [Sprint 2 Retrospective](docs/sprint2/retrospective.md)
