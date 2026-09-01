# Mini Task Manager — API Documentation

This directory contains the Postman collection for testing the Mini Task Manager REST API.

## Collection

```text
Mini Task Manager API
```

The collection contains authentication and task management endpoints.

## Requirements

Before testing the APIs, make sure the backend server is running.

Local backend:

```text
http://localhost:5000
```

## API Structure

```text
Mini Task Manager API
│
├── Authentication
│   ├── Register
│   └── Login
│
└── Tasks
    ├── Get All Tasks
    ├── Get Single Task
    ├── Create Task
    ├── Update Task
    └── Delete Task
```

## Authentication

### Register

```text
POST /api/auth/register
```

Example request:

```json
{
  "name": "Gaurav",
  "email": "gaurav@example.com",
  "password": "Password@123"
}
```

### Login

```text
POST /api/auth/login
```

Example request:

```json
{
  "email": "gaurav@example.com",
  "password": "Password@123"
}
```

After successful login, copy the JWT returned by the API.

Use it for protected task requests:

```text
Authorization: Bearer <JWT_TOKEN>
```

## Task APIs

### Get All Tasks

```text
GET /api/tasks
```

Returns tasks belonging to the authenticated user.

Example with pagination:

```text
GET /api/tasks?page=1&limit=5
```

Example with sorting:

```text
GET /api/tasks?page=1&limit=5&sort=newest
```

### Get Single Task

```text
GET /api/tasks/:id
```

Example:

```text
GET /api/tasks/64f123456789abcdef123456
```

The authenticated user can only retrieve their own task.

### Create Task

```text
POST /api/tasks
```

Example:

```json
{
  "title": "Complete assessment",
  "description": "Finish the full stack technical assessment",
  "status": "Pending",
  "priority": "High",
  "dueDate": "2026-09-02"
}
```

### Update Task

```text
PUT /api/tasks/:id
```

Example:

```json
{
  "title": "Complete technical assessment",
  "description": "Finish and submit the assessment",
  "status": "In Progress",
  "priority": "High",
  "dueDate": "2026-09-02"
}
```

### Delete Task

```text
DELETE /api/tasks/:id
```

Example:

```text
DELETE /api/tasks/64f123456789abcdef123456
```

The backend verifies that the task belongs to the authenticated user before deleting it.

## Task Status

```text
Pending
In Progress
Completed
```

## Task Priority

```text
Low
Medium
High
```

## Error Testing

The collection can also be used to test:

* Missing required fields
* Invalid email
* Duplicate email
* Invalid login credentials
* Missing JWT
* Invalid JWT
* Invalid task ID
* Non-existent task
* Accessing another user's task
* Invalid status
* Invalid priority

## Expected Authentication Header

Protected APIs require:

```text
Authorization: Bearer <JWT_TOKEN>
```

## HTTP Status Codes

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error
```

## Importing the Collection

1. Open Postman.
2. Select **Import**.
3. Select `Mini-Task-Manager.postman_collection.json`.
4. Import the collection.
5. Start the backend server.
6. Register a user.
7. Login and obtain the JWT.
8. Add the JWT to protected requests.
9. Test the task APIs.

## Testing Flow

Recommended order:

```text
1. Register
      ↓
2. Login
      ↓
3. Copy JWT
      ↓
4. Get All Tasks
      ↓
5. Create Task
      ↓
6. Get Single Task
      ↓
7. Update Task
      ↓
8. Delete Task
```

## Security Test

To verify authorization:

```text
User A creates Task A
        ↓
User B logs in
        ↓
User B attempts to access Task A
        ↓
Backend rejects the request
```

This verifies that users cannot access tasks belonging to other users.
