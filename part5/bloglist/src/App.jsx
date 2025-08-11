import { useState, useRef, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
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
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const timeoutIdRef = useRef(null)


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
      setUsername('')
      setPassword('')
      localStorage.setItem('user', JSON.stringify(user))
      notify(`You logged in successfully`, 'success')
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
  }

  const handleLogoutClick = () => {
    setUser(null)
    localStorage.removeItem('user')
    notify(`You logged out successfully`, 'success')
  }

  const handleCreateClick = async (blogObject) => {
    try {
      const savedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(savedBlog))
      resetForm()
      notify(`a new blog ${savedBlog.title} added`, 'success')
    } catch (exception) {
      notify(exception, 'error')
    }
  }

  const notify = (message, status) => {
    setMessage(message)
    setStatus(status)

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }

    timeoutIdRef.current = setTimeout(() => {
      setMessage('')
      setStatus('')
    }, 5000)
  }

  const resetForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if (!user) {
    return (
      <div>
        <Notification
          message={message}
          status={status}
        />
        <Login
          onSubmit={handleLoginClick}
          username={username}
          onUsernameChange={(e) => setUsername(e.target.value)}
          password={password}
          onPasswordChange={(e) => setPassword(e.target.value)}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={message}
        status={status}
      />

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