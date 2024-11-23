import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

import blogService from './services/blogs'
import loginService from './services/login'

import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { notify } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const userJSON = localStorage.getItem('user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (credential) => {
    try {
      const user = await loginService.login(credential)
      setUser(user)
      blogService.setToken(user.token)
      localStorage.setItem('user', JSON.stringify(user))
      dispatch(notify(`Welcome back ${user.name}`, 'success'))
    } catch (err) {
      dispatch(notify('wrong username or password', 'error'))
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.clear()
    dispatch(notify('See you soon', 'success'))
  }

  const createBlog = async (newBlog) => {
    try {
      const blog = await blogService.createBlog(newBlog)
      dispatch(notify(`Added ${blog.title} by ${blog.author}`, 'success'))
      setBlogs(blogs.concat(blog))
      blogFormRef.current.toggleVisibility()
    } catch (err) {
      dispatch(notify(err.response.data.error, 'error'))
    }
  }

  const likeBlog = async (blog) => {
    try {
      const { id, ...rest } = blog
      const updatedBlog = await blogService.updateBlog(id, {
        ...rest,
        likes: rest.likes + 1,
        user: rest.user.id,
      })
      setBlogs(blogs.map((b) => (b.id !== id ? b : updatedBlog)))
      dispatch(
        notify(`Like ${updatedBlog.title} by ${updatedBlog.author}`, 'success')
      )
    } catch (err) {
      dispatch(notify(err.response.data.error, 'error'))
    }
  }

  const deleteBlog = async (blog) => {
    if (confirm(`Remove ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        dispatch(notify(`Deleted ${blog.title} by ${blog.author}`, 'success'))
      } catch (err) {
        dispatch(notify(err.response.data.error, 'error'))
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification />
        <LoginForm onSubmit={login} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      <p>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </p>

      <h2>create new</h2>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm onSubmit={createBlog} />
      </Togglable>

      <BlogList
        blogs={sortedBlogs}
        currentUser={user}
        onLikeClick={likeBlog}
        onDeleteClick={deleteBlog}
      />
    </div>
  )
}

export default App
