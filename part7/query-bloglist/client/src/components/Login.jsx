import { useState } from "react";
import { TextField, Button } from "@mui/material";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useUserActions } from "../hooks/useUser";
import { useNotificationActions } from "../hooks/useNotification";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserActions();
  const { notify } = useNotificationActions();
  const navigate = useNavigate();

  const onChange = (e, callback) => {
    callback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginService.login({ username, password });
      setUser(response);
      blogService.setToken(response.token);
      localStorage.setItem("user", JSON.stringify(response));
      notify(`Welcome back ${response.name ?? response.username}`);
      setUsername("");
      setPassword("");
      navigate("/");
    } catch {
      notify("Wrong username or password", "error");
    }
  };

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="username"
            value={username}
            onChange={(e) => onChange(e, setUsername)}
            variant="standard"
          />
        </div>
        <div>
          <TextField
            label="password"
            value={password}
            onChange={(e) => onChange(e, setPassword)}
            variant="standard"
          />
        </div>

        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
