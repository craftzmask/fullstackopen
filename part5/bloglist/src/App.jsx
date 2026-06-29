import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Login from "./components/Login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));

    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      const userObject = JSON.parse(cachedUser);
      setUser(userObject);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await loginService.login({ username, password });
      setUser(userResponse);
      localStorage.setItem("user", JSON.stringify(userResponse));
      setUsername("");
      setPassword("");
    } catch (e) {
      console.error("Error message:", e);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
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
      <p>
        {user.name ?? user.username} logged in{" "}
        <button onClick={logout}>logout</button>
      </p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
