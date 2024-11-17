import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  const login = async e => {
    e.preventDefault()

    const user = await loginService.login(username, password)
    if (user) {
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.clear()
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm
          onSubmit={login}
          username={username}
          onUsernameChange={e => setUsername(e.target.value)}
          password={password}
          onPasswordChange={e => setPassword(e.target.value)} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </p>
      < BlogList blogs={blogs} />
    </div>
  )
}

export default App