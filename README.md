# MERN Blog App (JWT Auth + User-Owned Posts)

Full-stack blog app with React (Vite) frontend and Express/MongoDB backend.

## Current Status

- JWT authentication is enabled (register, login, get current user)
- Posts are protected by auth middleware
- Posts are user-owned (each post is linked to the logged-in user)
- Users can only view, edit, and delete their own posts
- Frontend stores token in localStorage and sends `Authorization: Bearer <token>`

## Tech Stack

- Frontend: React, React Router, Vite
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: jsonwebtoken, bcryptjs

## Main Features

- Register and login
- Password hashing with bcrypt
- JWT token generation after register/login
- Protected frontend routes
- Protected backend routes
- Create, read, update, delete posts (owned by authenticated user)
- Clean error handling for unauthorized access

## Project Structure

```text
Blog project/
├── server.js
├── .env
├── .env.example
├── package.json
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   └── postsController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   └── Post.js
├── routes/
│   ├── auth.js
│   └── posts.js
├── utils/
│   └── generateToken.js
└── client/
	├── package.json
	├── vite.config.js
	└── src/
		├── App.jsx
		├── App.css
		├── main.jsx
		├── utils/
		│   └── auth.js
		└── components/
			├── Home.jsx
			├── NewPost.jsx
			├── EditPost.jsx
			├── Login.jsx
			├── Register.jsx
			└── ProtectedRoute.jsx
```

## Environment Variables

Create a `.env` file in the root:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/blog
JWT_SECRET=your_jwt_secret_here
```

Notes:

- Backend port fallback is `3001`.
- `JWT_SECRET` is required for register/login to work.

## Install

From project root:

```bash
npm run install:all
```

This installs backend and frontend dependencies.

## Run

### Option A: Run both with one command

```bash
npm run dev:full
```

### Option B: Run separately

Terminal 1 (backend):

```bash
npm run dev
```

Terminal 2 (frontend):

```bash
npm run client
```

Default URLs:

- Backend: http://localhost:3001
- Frontend: http://localhost:5173

If 5173 is in use, Vite will move to the next port automatically.

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (protected)

### Posts (all protected)

- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts`
- `PATCH /api/posts/:id`
- `DELETE /api/posts/:id`

## Ownership Rules (Pass 2)

- Post owner is always derived from authenticated user (`req.user`)
- Client cannot set or spoof post owner
- Client no longer sends editable `author` field
- `author` display value is derived from authenticated username
- Users can only access their own posts

## Password Rules

Registration password must:

- Be at least 8 characters
- Include at least one uppercase letter
- Include at least one lowercase letter
- Include at least one number

This reduces weak password usage. Browser breach warnings can still appear if a known leaked password is used.

## Notes About Older Data

If older posts exist without a `user` field, they will not pass ownership checks.

Recommended approach:

- Keep app logic as-is for security
- Do a one-time manual cleanup/migration for old posts if needed

## Scripts

- `npm run dev` - Run backend
- `npm run client` - Run frontend
- `npm run dev:full` - Run both backend and frontend
- `npm run install:all` - Install backend + frontend dependencies
- `npm start` - Start backend with node