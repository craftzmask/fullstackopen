import { useState, useRef, useEffect } from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const timeoutIdRef = useRef(null)
  const blogFormRef = useRef()


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

  const handleLoginClick = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
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
      blogFormRef.current.toggleVisibility()
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

  if (!user) {
    return (
      <div>
        <Notification
          message={message}
          status={status}
        />
        <Login onSubmit={handleLoginClick} />
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

      <Toggable
        buttonLabel='create'
        ref={blogFormRef}
      >
        <BlogForm onSubmit={handleCreateClick} />
      </Toggable>

      <BlogList blogs={blogs} />
    </div>
  )
}

export default App