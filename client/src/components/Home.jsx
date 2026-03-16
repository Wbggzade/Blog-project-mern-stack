import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authFetch } from '../utils/auth.js';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await authFetch('/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await authFetch(`/api/posts/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('You do not have permission to delete this post');
        }
        throw new Error('Failed to delete post');
      }

      // Remove from local state
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home">
      <div className="posts-header">
        <h2>All Posts</h2>
        <Link to="/posts/new" className="btn btn-primary">Create New Post</Link>
      </div>

      {posts.length === 0 ? (
        <p>No posts yet. <Link to="/posts/new">Create your first post!</Link></p>
      ) : (
        <div className="posts-list">
          {posts.map(post => (
            <div key={post._id} className="post-card">
              <h3>{post.title}</h3>
              <div className="post-meta">
                <span>By: {post.author}</span>
                <span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <p>{post.content}</p>
              <div className="post-actions">
                <Link to={`/posts/${post._id}/edit`} className="btn btn-secondary">Edit</Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;