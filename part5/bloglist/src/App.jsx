import { useState, useRef, useEffect } from "react";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm/BlogForm";
import Notification from "./components/Notification";
import Toggable from "./components/Toggable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useQuery } from "@tanstack/react-query";

const App = () => {
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const query = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

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
      //notify("You logged in successfully", "success");
    } catch (exception) {
      //notify(exception.response.data.error, "error");
    }
  };

  const handleLogoutClick = () => {
    setUser(null);
    localStorage.removeItem("user");
    //notify("You logged out successfully", "success");
  };

  if (query.isLoading) {
    return <p>Loading...</p>;
  }

  const blogs = query.data;

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
        <BlogForm onCloseForm={() => blogFormRef?.current.toggleVisibility()} />
      </Toggable>

      <BlogList blogs={blogs} user={user} />
    </div>
  );
};

export default App;
