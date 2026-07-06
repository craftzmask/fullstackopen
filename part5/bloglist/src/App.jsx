import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Login from "./components/Login";
import AddBlog from "./components/AddBlog";
import Togglable from "./components/Togglable";
import Blogs from "./components/Blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const toggleRef = useRef();
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);
  const navigate = useNavigate();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));

    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      const userObject = JSON.parse(cachedUser);
      setUser(userObject);
      blogService.setToken(userObject.token);
    }
  }, []);

  const match = useMatch("/blogs/:id");
  const blog = match ? sortedBlogs.find((b) => b.id === match.params.id) : null;

  const handleLike = async (blog) => {
    try {
      const likedBlog = await blogService.like(blog);
      setBlogs(blogs.map((b) => (b.id === likedBlog.id ? likedBlog : b)));
      handleNotify(`Liked ${likedBlog.title} by ${likedBlog.author}`);
    } catch (error) {
      console.log(error);
      handleNotify(error.response.data.error, "error");
    }
  };

  const handleDelete = async (blog) => {
    try {
      if (confirm(`Deleted blog ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        handleNotify(`Deleted ${blog.title} by ${blog.author}`);
      }
    } catch (error) {
      handleNotify(error.response.data.error, "error");
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const userResponse = await loginService.login(credentials);
      setUser(userResponse);
      blogService.setToken(userResponse.token);
      localStorage.setItem("user", JSON.stringify(userResponse));
      handleNotify(
        `Welcome back ${userResponse.name ?? userResponse.username}`,
      );
      navigate("/");
    } catch {
      handleNotify("Wrong username or password", "error");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    blogService.setToken(null);
    handleNotify("See you again");
    navigate("/login");
  };

  const handleAddBlog = async (blogObject) => {
    try {
      const savedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(savedBlog));
      handleNotify(`Added ${savedBlog.title} succesfully`);
      toggleRef.current.toggleVisibility();
    } catch (error) {
      handleNotify(error.response.data.error, "error");
    }
  };

  const handleNotify = (message, status = "success") => {
    setMessage(message);
    setStatus(status);
    setTimeout(() => {
      setMessage("");
      setStatus("");
    }, 5000);
  };

  const padding = { padding: 5 };

  return (
    <div>
      <div>
        <Link style={padding} to="/">
          blogs
        </Link>
        {user ? (
          <button onClick={handleLogout}>logout</button>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </div>

      <Notification message={message} status={status} />

      {/*
      <div>
        <h2>create new</h2>
        <Togglable label="create a blog" ref={toggleRef}>
          <AddBlog onSubmit={handleAddBlog} />
        </Togglable>
      </div> */}

      <Routes>
        <Route path="/" element={<Blogs blogs={sortedBlogs} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              user={user}
              blog={blog}
              onLikeClick={handleLike}
              onDeleteClick={handleDelete}
            />
          }
        />
        <Route path="/login" element={<Login onSubmit={handleLogin} />} />
      </Routes>
    </div>
  );
};

export default App;
