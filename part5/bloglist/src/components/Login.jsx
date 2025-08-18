import { useAuth, useField } from "../hooks";

const Login = () => {
  const username = useField("text");
  const password = useField("password");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      username: username.inputProps.value,
      password: password.inputProps.value,
    });
    username.reset();
    password.reset();
  };

  return (
    <div>
      <h1>Login</h1>
      <form data-testid="login-form" onSubmit={handleSubmit}>
        <div>
          username <input data-testid="username" {...username.inputProps} />
        </div>

        <div>
          password{" "}
          <input
            data-testid="password"
            type="password"
            {...password.inputProps}
          />
        </div>

        <button data-testid="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
