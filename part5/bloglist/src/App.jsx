import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

    const user = await loginService.login(username, password)
    if (user) {
      setUser(user)
      blogService.setToken(user.token)
      localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.clear()
  }

  const createBlog = async e => {
    e.preventDefault()
    const blog = await blogService.createBlog({
      title, author, url
    })
    setBlogs(blogs.concat(blog))
    setTitle('')
    setAuthor('')
    setUrl('')
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

      <h2>create new</h2>
      <BlogForm
        onSubmit={createBlog}
        title={title}
        onTitleChange={e => setTitle(e.target.value)}
        author={author}
        onAuthorChange={e => setAuthor(e.target.value)}
        url={url}
        onUrlChange={e => setUrl(e.target.value)} />

      < BlogList blogs={blogs} />
    </div>
  )
}

export default App