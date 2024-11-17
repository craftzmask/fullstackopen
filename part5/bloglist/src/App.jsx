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

  const login = async e => {
    e.preventDefault()

    const user = await loginService.login(username, password)
    if (user) {
      setUser(user)
      setUsername('')
      setPassword('')
    }
  }

  if (user === null) {
    return (
      <LoginForm
        onSubmit={login}
        username={username}
        onUsernameChange={e => setUsername(e.target.value)}
        password={password}
        onPasswordChange={e => setPassword(e.target.value)}
      />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      < BlogList blogs={blogs} />
    </div>
  )
}

export default App