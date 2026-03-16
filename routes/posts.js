import express from 'express';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All post routes require a valid JWT.
router.use(protect);

// RESTful API routes for posts
router.get('/posts', getAllPosts);          // GET /api/posts
router.get('/posts/:id', getPostById);      // GET /api/posts/:id
router.post('/posts', createPost);          // POST /api/posts
router.patch('/posts/:id', updatePost);     // PATCH /api/posts/:id
router.delete('/posts/:id', deletePost);    // DELETE /api/posts/:id

export default router;