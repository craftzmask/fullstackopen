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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const toggleRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));

    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      const userObject = JSON.parse(cachedUser);
      setUser(userObject);
      blogService.setToken(userObject.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await loginService.login({ username, password });
      setUser(userResponse);
      blogService.setToken(userResponse.token);
      localStorage.setItem("user", JSON.stringify(userResponse));
      setUsername("");
      setPassword("");
      notify(`Welcome back ${userResponse.name ?? userResponse.username}`);
    } catch {
      notify(`Wrong username or password`, "error");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    blogService.setToken(null);
    notify("See you again");
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      const savedBlog = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(savedBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      notify(`Added ${savedBlog.title} succesfully`);
      toggleRef.current.toggleVisibility();
    } catch (error) {
      notify(error.response.data.error, "error");
    }
  };

  const notify = (message, status = "success") => {
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
        <Login
          onSubmit={handleLogin}
          username={username}
          onUsernameChange={(e) => setUsername(e.target.value)}
          password={password}
          onPasswordChange={(e) => setPassword(e.target.value)}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} status={status} />
      <p>
        {user.name ?? user.username} logged in{" "}
        <button onClick={logout}>logout</button>
      </p>

      <h2>create new</h2>
      <Togglable label="create a blog" ref={toggleRef}>
        <AddBlog
          onSubmit={handleAddBlog}
          title={title}
          onTitleChange={(e) => setTitle(e.target.value)}
          author={author}
          onAuthorChange={(e) => setAuthor(e.target.value)}
          url={url}
          onUrlChange={(e) => setUrl(e.target.value)}
        />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
