import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useMatch,
  Navigate,
} from "react-router-dom";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Login from "./components/Login";
import AddBlog from "./components/AddBlog";
import Blogs from "./components/Blogs";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import ErrorBoundary from "./components/ErrorBoundary";
import { useNotifcationActions } from "./store";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { notify } = useNotifcationActions();

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
      notify(`Liked ${likedBlog.title} by ${likedBlog.author}`);
    } catch (error) {
      console.log(error);
      notify(error.response.data.error, "error");
    }
  };

  const handleDelete = async (blog) => {
    try {
      if (confirm(`Deleted blog ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        notify(`Deleted ${blog.title} by ${blog.author}`);
      }
      navigate("/");
    } catch (error) {
      notify(error.response.data.error, "error");
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const userResponse = await loginService.login(credentials);
      setUser(userResponse);
      blogService.setToken(userResponse.token);
      localStorage.setItem("user", JSON.stringify(userResponse));
      notify(`Welcome back ${userResponse.name ?? userResponse.username}`);
      navigate("/");
    } catch {
      notify("Wrong username or password", "error");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    blogService.setToken(null);
    notify("See you again");
    navigate("/login");
  };

  const handleAddBlog = async (blogObject) => {
    try {
      const savedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(savedBlog));
      notify(`Added ${savedBlog.title} succesfully`);
      navigate("/");
    } catch (error) {
      notify(error.response.data.error, "error");
    }
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

      <Notification />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Blogs blogs={blogs} />} />
          {user && (
            <Route
              path="/create"
              element={
                <ErrorBoundary>
                  <AddBlog onSubmit={handleAddBlog} />
                </ErrorBoundary>
              }
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
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" replace={true} />
              ) : (
                <Login onSubmit={handleLogin} />
              )
            }
          />
          <Route path="*" element={<h2>404 - Page Not found</h2>} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;
