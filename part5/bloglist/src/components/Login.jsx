import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={(e) => onChange(e, setUsername)}
        />
      </div>
      <div>
        password
        <input
          type="text"
          value={password}
          onChange={(e) => onChange(e, setPassword)}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
