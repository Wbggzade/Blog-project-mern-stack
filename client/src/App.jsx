import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>My Blog</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/posts/new">New Post</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/new" element={<NewPost />} />
            <Route path="/posts/:id/edit" element={<EditPost />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
