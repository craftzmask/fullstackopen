import { useRef } from "react";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm/BlogForm";
import Notification from "./components/Notification";
import Toggable from "./components/Toggable";
import { useUsernValue } from "./reducers/userReducer";
import { useAuth } from "./hooks";
import { Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";

const App = () => {
  const user = useUsernValue();
  const { logout } = useAuth();
  const blogFormRef = useRef();

  if (!user) {
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
        {user.name ?? user.username} logged in
        <button onClick={logout}>logout</button>
      </p>

      {/*

      <Toggable buttonLabel="create" ref={blogFormRef}>
        <BlogForm onCloseForm={() => blogFormRef?.current.toggleVisibility()} />
      </Toggable>

      <BlogList /> */}

      <Routes>
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  );
};

export default App;
