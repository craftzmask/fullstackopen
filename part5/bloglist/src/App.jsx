import { useRef } from "react";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm/BlogForm";
import Blog from "./components/Blog/Blog";
import Notification from "./components/Notification";
import Toggable from "./components/Toggable";
import { useUsernValue } from "./reducers/userReducer";
import { useAuth } from "./hooks";
import { Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import User from "./components/User";

const App = () => {
  const currentUser = useUsernValue();
  const { logout } = useAuth();
  const blogFormRef = useRef();

  if (!currentUser) {
    return (
      <>
        <Notification />
        <Login />
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      <p>
        {currentUser.name ?? currentUser.username} logged in
        <button onClick={logout}>logout</button>
      </p>

      {/*

      <Toggable buttonLabel="create" ref={blogFormRef}>
        <BlogForm onCloseForm={() => blogFormRef?.current.toggleVisibility()} />
      </Toggable>

      <BlogList /> */}

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
