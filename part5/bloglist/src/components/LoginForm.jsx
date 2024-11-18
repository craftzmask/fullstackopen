import { useState } from 'react'

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
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
          onChange={e => setUsername(e.target.value)}
          name='username'
          type='text'
          id='username'
        />
      </div>
      <div>
        <label htmlFor='password'>password:</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          name='password'
          type='password'
          id='password'
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm