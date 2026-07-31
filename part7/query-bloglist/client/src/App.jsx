import { useEffect } from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Login from "./components/Login";
import AddBlog from "./components/AddBlog";
import Blogs from "./components/Blogs";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import ErrorBoundary from "./components/ErrorBoundary";
import { useUserStore, useUserActions } from "./store";
import { useNotificationDispatch } from "./context/NotificationContext";

const App = () => {
  const { user } = useUserStore();
  const { setUser, clearUser } = useUserActions();
  const notify = useNotificationDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      const userObject = JSON.parse(cachedUser);
      setUser(userObject);
      blogService.setToken(userObject.token);
    }
  }, [setUser]);

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
    clearUser();
    localStorage.removeItem("user");
    blogService.setToken(null);
    notify("See you again");
    navigate("/login");
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
          <Route path="/" element={<Blogs />} />
          {user && <Route path="/create" element={<AddBlog />} />}
          <Route path="/blogs/:id" element={<Blog user={user} />} />
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
