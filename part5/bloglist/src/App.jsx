import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
      blogService.setToken(user.token)
    }
  }, [])

  const login = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login(username, password)
      setUser(user)
      blogService.setToken(user.token)
      localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (err) {
      notify('wrong username or password', 'error')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.clear()
  }

  const createBlog = async e => {
    e.preventDefault()
    try {
      const blog = await blogService.createBlog({
        title, author, url
      })
      notify(`Added ${blog.title} by ${blog.author}`, 'success')
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      blogFormRef.current.toggleVisibility()
    } catch (err) {
      notify(err.response.data.error, 'error')
    }
  }

  const notify = (message, status, duration=2) => {
    setMessage(message)
    setStatus(status)
    setTimeout(() => {
      setMessage('')
      setStatus('')
    }, duration * 1000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification
          message={message}
          status={status} />
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
      <Notification
        message={message}
        status={status} />
      <p>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </p>

      <h2>create new</h2>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          onSubmit={createBlog}
          title={title}
          onTitleChange={e => setTitle(e.target.value)}
          author={author}
          onAuthorChange={e => setAuthor(e.target.value)}
          url={url}
          onUrlChange={e => setUrl(e.target.value)} />
      </Togglable>

      < BlogList blogs={blogs} />
    </div>
  )
}

export default App