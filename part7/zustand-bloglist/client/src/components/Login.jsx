import { useState } from "react";
import { TextField, Button } from "@mui/material";

const Login = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e, callback) => {
    callback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ username, password });
    setUsername("");
    setPassword("");
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
