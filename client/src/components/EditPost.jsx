import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setFetchLoading(true);
      const response = await fetch(`/api/posts/${id}`);
      if (!response.ok) {
        throw new Error('Post not found');
      }
      const post = await response.json();
      setFormData({
        title: post.title,
        content: post.content,
        author: post.author
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
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
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
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