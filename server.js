import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';

// Import database connection
import connectDB from './config/database.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for React frontend
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', postsRoutes);

// 404 handler for API
app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Error handler for API
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`API Server is running on http://localhost:${PORT}`);
});
