import { useEffect } from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Login from "./components/Login";
import AddBlog from "./components/AddBlog";
import Blogs from "./components/Blogs";
import ErrorBoundary from "./components/ErrorBoundary";
import { useUserStore, useUserActions } from "./store";
import { useNotificationDispatch } from "./context/NotificationContext";
import Navbar from "./components/Navbar";

const App = () => {
  const { user } = useUserStore();
  const { setUser } = useUserActions();
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

  return (
    <div>
      <Navbar />
      <Notification />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Blogs />} />
          {user && <Route path="/create" element={<AddBlog />} />}
          <Route path="/blogs/:id" element={<Blog />} />
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
