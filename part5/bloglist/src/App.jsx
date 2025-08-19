import { useRef } from "react";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm/BlogForm";
import Blog from "./components/Blog/Blog";
import Notification from "./components/Notification";
import Toggable from "./components/Toggable";
import { useUsernValue } from "./reducers/userReducer";
import { useAuth } from "./hooks";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import UserList from "./components/UserList";
import User from "./components/User";

const App = () => {
  const currentUser = useUsernValue();
  const { logout } = useAuth();
  const blogFormRef = useRef();
  const location = useLocation();

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
      <nav
        style={{
          display: "flex",
          gap: 8,
          background: "#D3D3D3",
        }}
      >
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>

        <span>
          <strong>{currentUser.name ?? currentUser.username}</strong> logged in
          <button onClick={logout}>logout</button>
        </span>
      </nav>

      <main>
        <h2>blogs</h2>
        <Notification />

        {location.pathname === "/" && (
          <Toggable buttonLabel="create" ref={blogFormRef}>
            <BlogForm
              onCloseForm={() => blogFormRef?.current.toggleVisibility()}
            />
          </Toggable>
        )}

        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
