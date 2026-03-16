import express from 'express';

const router = express.Router();

// Helper function to fetch data from API
const fetchFromAPI = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  return response.json();
};

// Home page - list all posts
router.get('/', async (req, res) => {
  try {
    const posts = await fetchFromAPI('http://localhost:3000/api/posts');
    res.render('index', { posts, error: null });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.render('index', { posts: [], error: 'Failed to load posts' });
  }
});

// New post form
router.get('/posts/new', (req, res) => {
  res.render('new', { post: null, error: null });
});

// Edit post form
router.get('/posts/:id/edit', async (req, res) => {
  try {
    const post = await fetchFromAPI(`http://localhost:3000/api/posts/${req.params.id}`);
    res.render('edit', { post, error: null });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.render('edit', { post: null, error: 'Post not found' });
  }
});

// Handle form submissions using POST routes that call API
router.post('/posts', async (req, res) => {
  try {
    await fetchFromAPI('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    res.redirect('/');
  } catch (error) {
    console.error('Error creating post:', error);
    res.render('new', { post: req.body, error: 'Failed to create post' });
  }
});

router.post('/posts/:id/update', async (req, res) => {
  try {
    await fetchFromAPI(`http://localhost:3000/api/posts/${req.params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    res.redirect('/');
  } catch (error) {
    console.error('Error updating post:', error);
    const post = { ...req.body, id: req.params.id };
    res.render('edit', { post, error: 'Failed to update post' });
  }
});

router.post('/posts/:id/delete', async (req, res) => {
  try {
    await fetchFromAPI(`http://localhost:3000/api/posts/${req.params.id}`, {
      method: 'DELETE'
    });
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting post:', error);
    res.redirect('/');
  }
});

export default router;