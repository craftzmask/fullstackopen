import { useState } from 'react'

const Login = ({ onSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h1>Login</h1>
      <form
        data-testid="login-form"
        onSubmit={handleSubmit}
      >
        <div>
          username <input
            data-testid="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          password <input
            data-testid="password"
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          data-testid="login-button"
          type='submit'
        >
          login
        </button>
      </form>
    </div>
  )
}

export default Login