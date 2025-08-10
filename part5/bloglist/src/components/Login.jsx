const Login = ({
  onSubmit,
  username,
  onUsernameChange,
  password,
  onPasswordChange
}) => {

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          username <input
            value={username}
            onChange={onUsernameChange}
          />
        </div>

        <div>
          password <input
            value={password}
            onChange={onPasswordChange}
          />
        </div>

        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login