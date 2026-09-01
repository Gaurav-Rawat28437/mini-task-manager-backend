# Mini Task Manager — Backend

REST API for a Mini Task Management Application built using Node.js, Express.js, MongoDB and JWT authentication.

The backend provides authentication and protected task management APIs. Each authenticated user can only access and manage their own tasks.

## Features

* User registration
* User login
* Password hashing using bcrypt
* JWT authentication
* Protected APIs
* User-specific task access
* Create task
* Get all tasks
* Get a single task
* Update task
* Delete task
* Task status management
* Task priority management
* Optional due dates
* Input validation
* Error handling
* Pagination
* Sorting

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token
* bcrypt
* dotenv

## Project Structure

```text
src/
│
├── controllers/
│   ├── authController.js
│   └── taskController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   └── Task.js
│
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
│
├── utils/
│   └── generateToken.js


server.js
.env.example
package.json
```

## Installation

Clone the repository:

```bash
git clone https://github.com/Gaurav-Rawat28437/mini-task-manager-backend.git
```

Go to the project directory:

```bash
cd mini-task-manager-backend
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Never commit the real `.env` file or production secrets to GitHub.

## Run the Server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

The API will normally run at:

```text
http://localhost:5000
```

## Authentication

Authentication is implemented using JWT.

### Authentication Flow

1. User registers with name, email and password.
2. Password is hashed using bcrypt.
3. Hashed password is stored in MongoDB.
4. User logs in with email and password.
5. Backend compares the password using bcrypt.
6. A JWT is generated after successful login.
7. Protected APIs require the JWT.
8. Authentication middleware verifies the token.
9. The authenticated user's ID is attached to the request.
10. Task operations use that user ID to enforce ownership.

## API Endpoints

### Authentication

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register a new user   |
| POST   | `/api/auth/login`    | Login and receive JWT |

### Tasks

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| GET    | `/api/tasks`     | Get logged-in user's tasks |
| GET    | `/api/tasks/:id` | Get one task               |
| POST   | `/api/tasks`     | Create a task              |
| PUT    | `/api/tasks/:id` | Update a task              |
| DELETE | `/api/tasks/:id` | Delete a task              |

All task APIs require authentication.

## Authorization

Protected requests require:

```text
Authorization: Bearer <JWT_TOKEN>
```

The backend verifies the token before allowing access to task APIs.

## Task Ownership

Each task contains a `userId` field referencing the user who created it.

For task operations, the backend verifies both the task ID and authenticated user ID.

Conceptually:

```js
Task.findOne({
    _id: taskId,
    userId: req.user.id
})
```

This prevents one user from accessing, modifying, or deleting another user's tasks.

## Task Schema

| Field       | Type     | Required |
| ----------- | -------- | -------- |
| title       | String   | Yes      |
| description | String   | Yes      |
| status      | String   | Yes      |
| priority    | String   | Yes      |
| dueDate     | Date     | No       |
| userId      | ObjectId | Yes      |
| createdAt   | Date     | Auto     |
| updatedAt   | Date     | Auto     |

## Status

Valid task statuses:

```text
Pending
In Progress
Completed
```

## Priority

Valid priorities:

```text
Low
Medium
High
```

## Pagination

The task API supports pagination.

Example:

```text
GET /api/tasks?page=1&limit=5
```

The API returns pagination information such as:

```json
{
  "page": 1,
  "limit": 5,
  "totalPages": 3,
  "hasNextPage": true,
  "hasPreviousPage": false
}
```

## Sorting

The API supports task sorting.

Available options include:

```text
newest
oldest
priorityHigh
priorityLow
dueDateSoon
dueDateLate
```

Example:

```text
GET /api/tasks?page=1&limit=5&sort=newest
```

## Validation

The backend validates incoming data and rejects invalid requests.

Examples include:

* Missing required fields
* Invalid email
* Duplicate email
* Invalid password
* Invalid status
* Invalid priority
* Invalid MongoDB task ID
* Unauthorized requests
* Access to another user's task

## HTTP Status Codes

Common responses include:

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

## Security

The application follows basic security practices:

* Passwords are never stored as plain text.
* Passwords are hashed using bcrypt.
* JWT is used for authentication.
* Task APIs are protected by authentication middleware.
* Users can only access their own tasks.
* Secrets are stored using environment variables.
* `.env` is excluded from Git.

## Error Handling

The API returns JSON responses with meaningful error messages.

Example:

```json
{
  "success": false,
  "message": "Task not found"
}
```

## Frontend

Frontend repository:

https://github.com/Gaurav-Rawat28437/mini-task-manager-frontend

## Postman

A Postman collection is included for testing the API endpoints.

## Future Improvements

* Swagger API documentation
* Automated API tests
* Docker support
* Rate limiting
* Request logging
* Advanced task filtering
* Database indexing optimization
* Deployment and CI/CD
