import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Login from "./components/Login";
import AddBlog from "./components/addBlog";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const toggleRef = useRef();
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));

    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      const userObject = JSON.parse(cachedUser);
      setUser(userObject);
      blogService.setToken(userObject.token);
    }
  }, []);

  const handleLike = async (blog) => {
    try {
      const likedBlog = await blogService.like(blog);
      setBlogs(blogs.map((b) => (b.id === likedBlog.id ? likedBlog : b)));
      handleNotify(`Liked ${likedBlog.title} by ${likedBlog.author}`);
    } catch (error) {
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
    } catch {
      handleNotify("Wrong username or password", "error");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    blogService.setToken(null);
    handleNotify("See you again");
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

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={message} status={status} />
        <Login onSubmit={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} status={status} />
      <p>
        {user.name ?? user.username} logged in{" "}
        <button onClick={handleLogout}>logout</button>
      </p>

      <h2>create new</h2>
      <Togglable label="create a blog" ref={toggleRef}>
        <AddBlog onSubmit={handleAddBlog} />
      </Togglable>

      {sortedBlogs.map((blog) => (
        <Blog
          user={user}
          key={blog.id}
          blog={blog}
          onLikeClick={handleLike}
          onDeleteClick={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
