import mongoose from 'mongoose';

// Post schema for blog posts
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create and export the Post model
const Post = mongoose.model('Post', postSchema);

export default Post;