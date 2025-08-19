import { useRef } from "react";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm/BlogForm";
import Notification from "./components/Notification";
import Toggable from "./components/Toggable";
import { useUsernValue } from "./reducers/userReducer";
import { useAuth } from "./hooks";
import { Route, Routes, useMatch } from "react-router-dom";
import UserList from "./components/UserList";
import User from "./components/User";
import { useQuery } from "@tanstack/react-query";
import userService from "./services/users";

const App = () => {
  const currentUser = useUsernValue();
  const { logout } = useAuth();
  const blogFormRef = useRef();
  const userMatch = useMatch("/users/:id");

  const query = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  if (query.isLoading) {
    return <p>Loading...</p>;
  }

  const users = query.data;

  console.log(users);

  const user = userMatch
    ? users.find((u) => u.id === userMatch.params.id)
    : null;

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
        <Route path="/users" element={<UserList users={users} />} />
        <Route path="/users/:id" element={<User user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
