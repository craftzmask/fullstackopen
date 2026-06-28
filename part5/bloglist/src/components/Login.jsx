const Login = ({
  onSubmit,
  username,
  onUsernameChange,
  password,
  onPasswordChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        username
        <input type="text" value={username} onChange={onUsernameChange} />
      </div>
      <div>
        password
        <input type="text" value={password} onChange={onPasswordChange} />
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
