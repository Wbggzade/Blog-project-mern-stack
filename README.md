# Blog App - React Frontend + Express API Backend

A full-stack blog application with React frontend and Express/MongoDB backend.

## Features

- ✅ Create, read, update, delete blog posts
- ✅ React frontend with routing
- ✅ Express API with MongoDB
- ✅ RESTful API endpoints
- ✅ Loading states and error handling
- ✅ Responsive design

## Tech Stack

- **Frontend:** React, React Router, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Development:** Concurrently for running both servers

## Project Structure

```
blog-project/
├── server.js              # Express API server
├── config/
│   └── database.js        # MongoDB connection
├── controllers/
│   └── postsController.js # API business logic
├── models/
│   └── Post.js           # Mongoose schema
├── routes/
│   └── posts.js          # API routes
├── client/               # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx
│   │   │   ├── NewPost.jsx
│   │   │   └── EditPost.jsx
│   │   ├── App.jsx
│   │   └── App.css
│   └── vite.config.js
├── .env                  # Environment variables
└── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (local installation or MongoDB Atlas)

### 1. Install Dependencies
```bash
# Install all dependencies (backend + frontend)
npm run install:all
```

### 2. Environment Setup
- Copy `.env.example` to `.env`
- Update `MONGODB_URI` with your MongoDB connection string
- Default: `mongodb://localhost:27017/blog`

### 3. Start MongoDB
Make sure MongoDB is running locally or update the URI for cloud.

### 4. Run the Application

#### Development (both servers):
```bash
npm run dev:full
```
- Backend: http://localhost:3001
- Frontend: http://localhost:5173

#### Production:
```bash
npm start  # Backend only
npm run client  # Frontend only (after building)
```

## API Endpoints

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PATCH /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

## What Was Reused vs Changed

### Reused (Backend - No Changes):
- ✅ MongoDB connection (`config/database.js`)
- ✅ Mongoose Post model (`models/Post.js`)
- ✅ Posts controller (`controllers/postsController.js`)
- ✅ API routes (`routes/posts.js`)
- ✅ All CRUD logic and validation
- ✅ Error handling in controllers

### Changed (Frontend Conversion):
- ❌ Removed EJS views and page routes
- ❌ Removed EJS rendering middleware
- ✅ Added CORS to backend
- ✅ Created React components with fetch calls
- ✅ Added React Router for navigation
- ✅ Configured Vite proxy for API calls
- ✅ Added loading/error states in React
- ✅ Responsive CSS for React components

### New Additions:
- ✅ React frontend with Vite
- ✅ Concurrent development setup
- ✅ Proxy configuration for seamless API calls

## Development Notes

- The React app uses `/api` prefix for API calls, proxied to the backend
- All original backend functionality preserved
- Frontend handles loading states and user feedback
- No Redux - kept simple with React hooks