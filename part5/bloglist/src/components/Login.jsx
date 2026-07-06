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
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={(e) => onChange(e, setUsername)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={(e) => onChange(e, setPassword)}
            />
          </label>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
