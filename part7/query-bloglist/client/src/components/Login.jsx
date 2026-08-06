import { TextField, Button } from "@mui/material";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useUserActions } from "../hooks/useUser";
import { useNotificationActions } from "../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../services/persistentUser";
import { useField } from "../hooks/useField";

const Login = () => {
  const username = useField("username");
  const password = useField("password", "password");
  const { setUser } = useUserActions();
  const { notify } = useNotificationActions();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginService.login({
        username: username.value,
        password: password.value,
      });
      setUser(response);
      saveUser(JSON.stringify(response));
      blogService.setToken(response.token);
      notify(`Welcome back ${response.name ?? response.username}`);
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
          <TextField {...username} variant="standard" />
        </div>
        <div>
          <TextField {...password} variant="standard" />
        </div>

        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
