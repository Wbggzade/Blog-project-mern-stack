import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authFetch } from '../utils/auth.js';

function EditPost() {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchPost = useCallback(async () => {
    try {
      setFetchLoading(true);
      const response = await authFetch(`/api/posts/${id}`);
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('You do not have permission to edit this post');
        }
        throw new Error('Post not found');
      }
      const post = await response.json();
      setFormData({
        title: post.title,
        content: post.content
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await authFetch(`/api/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: formData.title,
          content: formData.content
        })
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('You do not have permission to edit this post');
        }
        throw new Error('Failed to update post');
      }

      // Redirect to home
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return <div className="loading">Loading post...</div>;
  }

  if (error && fetchLoading === false) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="edit-post">
      <h2>Edit Post</h2>
      <button onClick={() => navigate('/')} className="btn btn-secondary">← Back to Posts</button>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="10"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
}

export default EditPost;
