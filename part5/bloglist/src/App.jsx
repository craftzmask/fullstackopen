import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLoginClick = async (e) => {
    e.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      
      setUser(user)
    } catch (exception) {

    }
  }

  if (!user) {
    return (
      <Login
        onSubmit={handleLoginClick}
        username={username}
        onUsernameChange={(e) => setUsername(e.target.value)}
        password={password}
        onPasswordChange={(e) => setPassword(e.target.value)}
      />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name ?? user.username} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App