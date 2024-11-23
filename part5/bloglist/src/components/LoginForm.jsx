import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='username'>username:</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name='username'
          type='text'
          id='username'
          data-testid='username'
        />
      </div>
      <div>
        <label htmlFor='password'>password:</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name='password'
          type='password'
          id='password'
          data-testid='password'
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default LoginForm
