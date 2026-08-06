import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import Login from "./components/Login";
import AddBlog from "./components/AddBlog";
import Blogs from "./components/Blogs";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import { useUser, useUserActions } from "./hooks/useUser";
import { getUser } from "./services/persistentUser";

const App = () => {
  const user = useUser();
  const { setUser } = useUserActions();

  useEffect(() => {
    const cachedUser = getUser();
    if (cachedUser) {
      setUser(cachedUser);
      blogService.setToken(cachedUser.token);
    }
  }, [setUser]);

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
            element={user ? <Navigate to="/" replace={true} /> : <Login />}
          />
          <Route path="*" element={<h2>404 - Page Not found</h2>} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;
