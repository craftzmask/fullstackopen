import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useUserActions, useUserStore } from "../store";
import { useNotificationActions } from "../hooks/useNotification";
import blogService from "../services/blogs";

const Navbar = () => {
  const { user } = useUserStore();
  const { notify } = useNotificationActions();
  const { clearUser } = useUserActions();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem("user");
    blogService.setToken(null);
    notify("See you again");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/" sx={{ mr: "auto" }}>
          <Typography variant="h6" component="h1">
            Blog App
          </Typography>
        </Button>
        <div>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/create">
            new blog
          </Button>

          {!user && (
            <Button color="inherit" component={Link} to="/login">
              login
            </Button>
          )}

          {user && (
            <Button color="error" variant="contained" onClick={handleLogout}>
              logout
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
