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

import {
  Container,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
} from "@mui/material";

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
    <Container>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar sx={{ display: "flex", gap: 2 }}>
          {/* Left links */}
          <Button component={Link} to="/" color="inherit">
            Blogs
          </Button>
          <Button component={Link} to="/users" color="inherit">
            Users
          </Button>

          {/* Spacer pushes user info to the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Right side user info */}
          <Typography variant="body1" sx={{ mr: 2 }}>
            <strong>{currentUser.name ?? currentUser.username}</strong> logged
            in
          </Typography>

          <Button variant="contained" color="error" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <main>
        <Typography variant="h3" sx={{ mb: 5 }}>
          Blog App
        </Typography>

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
    </Container>
  );
};

export default App;
