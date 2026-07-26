import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Login from "./components/Login";
import AddBlog from "./components/AddBlog";
import Blogs from "./components/Blogs";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
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
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null;

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
      navigate("/");
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
      navigate("/");
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

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/" sx={{ mr: "auto" }}>
            <Typography variant="h6" component="h1">
              Blog App
            </Typography>
          </Button>
          <div>
            <Button color="inherit" component={Link} to="/">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/create">
              new blog
            </Button>

            {!user && (
              <Button color="inherit" component={Link} to="/login">
                login
              </Button>
            )}

            {user && (
              <Button color="error" variant="contained" onClick={handleLogout}>
                logout
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Notification message={message} status={status} />

      <Routes>
        <Route path="/" element={<Blogs blogs={blogs} />} />
        {user && (
          <Route
            path="/create"
            element={<AddBlog onSubmit={handleAddBlog} />}
          />
        )}
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
