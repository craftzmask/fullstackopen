import { useState, useRef, useEffect } from "react";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm/BlogForm";
import Notification from "./components/Notification";
import Toggable from "./components/Toggable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useNotificationDispatch } from "./components/reducers/notificationReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const timeoutIdRef = useRef(null);
  const blogFormRef = useRef();
  const notificationDispatch = useNotificationDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLoginClick = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      setUser(user);
      blogService.setToken(user.token);
      localStorage.setItem("user", JSON.stringify(user));
      notify("You logged in successfully", "success");
    } catch (exception) {
      notify(exception.response.data.error, "error");
    }
  };

  const handleLogoutClick = () => {
    setUser(null);
    localStorage.removeItem("user");
    notify("You logged out successfully", "success");
  };

  const handleCreateClick = async (blogObject) => {
    try {
      const savedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(savedBlog));
      blogFormRef.current.toggleVisibility();
      notify(`a new blog ${savedBlog.title} added`, "success");
    } catch (exception) {
      notify(exception.response.data.error, "error");
    }
  };

  const handleLikeClick = async (blogObject) => {
    const updated = await blogService.update(blogObject);
    setBlogs(blogs.map((b) => (b.id !== updated.id ? b : updated)));
  };

  const handleRemoveClick = async (blogObject) => {
    if (confirm(`Remove ${blogObject.title}?`)) {
      await blogService.remove(blogObject);
      setBlogs(blogs.filter((b) => b.id !== blogObject.id));
    }
  };

  const notify = (message, status) => {
    notificationDispatch({
      type: "SET",
      payload: { message, status },
    });

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      notificationDispatch({ type: "REMOVE" });
    }, 5000);
  };

  if (!user) {
    return (
      <div>
        <Notification />
        <Login onSubmit={handleLoginClick} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      <p>
        {user.name ?? user.username} logged in
        <button onClick={handleLogoutClick}>logout</button>
      </p>

      <Toggable buttonLabel="create" ref={blogFormRef}>
        <BlogForm onSubmit={handleCreateClick} />
      </Toggable>

      <BlogList
        blogs={blogs}
        user={user}
        onLikeClick={handleLikeClick}
        onRemoveClick={handleRemoveClick}
      />
    </div>
  );
};

export default App;
