# Blog App

A full-stack blog application built with a Node.js/Express backend and a React/Vite frontend. Users can create accounts, sign in, view blog posts, and publish new posts after authentication.

## Features

- User registration and login
- Protected post creation flow
- Browse all published blog posts
- Author and post date display on the post list
- Responsive UI with React Router and Tailwind CSS

## Tech Stack

### Backend

- Node.js
- Express.js
- Sequelize ORM
- MySQL database
- JWT authentication

### Frontend

- React
- Vite
- React Router DOM
- Zustand for state management
- Axios for API requests
- Tailwind CSS

## Project Structure

- [backend](backend) - API server, database connection, models, routes, and authentication logic
- [frontend](frontend) - React app for the user interface
- [README.md](README.md) - Project overview and setup instructions

## Prerequisites

Before you start, make sure you have the following installed:

- Node.js (v18 or newer recommended)
- npm
- MySQL server running locally

## Database Setup

1. Start your MySQL server.
2. Create a database named `users_db`.
3. Update your database credentials in [backend/src/config/db.config.js](backend/src/config/db.config.js) if your local MySQL username or password is different.

The backend uses Sequelize with `sync({ alter: true })`, so the required tables will be created automatically when the server starts.

## Environment Variables

Create a `.env` file in the [backend](backend) directory with the following variables:

```env
PORT=8000
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

## Installation

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Running the App

### Start the backend

```bash
cd backend
npm run backend
```

The backend server will start on `http://localhost:8000` by default.

### Start the frontend

```bash
cd frontend
npm run dev
```

The frontend will usually open on `http://localhost:5173`.

> Note: The frontend API base URL is currently set in [frontend/src/lib/axios.js](frontend/src/lib/axios.js). If your backend runs on a different port, update the base URL accordingly.

## API Endpoints

### User Routes

- `POST /api/users` - Register a new user
- `POST /api/users/auth` - Login a user
- `GET /api/users/get-posts/:id` - Get posts for a specific user

### Post Routes

- `POST /api/posts` - Create a new post (requires authentication)
- `GET /api/posts` - Get all posts (requires authentication)
- `PATCH /api/posts/:id` - Update a post (requires authentication)
- `DELETE /api/posts/:id` - Delete a post (requires authentication)

## Authentication Flow

- A user registers or logs in.
- The backend returns a JWT token.
- The frontend stores the token in local storage.
- Protected routes send the token in the `Authorization: Bearer <token>` header.

## Common Troubleshooting

- If the backend cannot connect to MySQL, verify the credentials in [backend/src/config/db.config.js](backend/src/config/db.config.js).
- If API requests fail, confirm that the frontend base URL in [frontend/src/lib/axios.js](frontend/src/lib/axios.js) matches the backend port.
- If authentication fails, make sure the user is logged in and the token is being sent correctly.

## Notes

This project is a simple blog platform for learning and practice. It demonstrates a basic full-stack architecture with authentication, database integration, and a React-based UI.
