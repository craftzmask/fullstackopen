import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLoginClick = async (e) => {
    e.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
    } catch (exception) {

    }
  }

  const handleLogoutClick = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const handleCreateClick = async (blogObject) => {
    try {
      const savedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(savedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.error(exception)
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
      <p>
        {user.name ?? user.username} logged in
        <button onClick={handleLogoutClick}>logout</button>
      </p>

      <BlogForm
        title={title}
        author={author}
        url={url}
        onTitleChange={(e) => setTitle(e.target.value)}
        onAuthorChange={(e) => setAuthor(e.target.value)}
        onUrlChange={(e) => setUrl(e.target.value)}
        onSubmit={handleCreateClick}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App