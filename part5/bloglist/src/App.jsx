import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

import blogService from './services/blogs'

import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

import { notify } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { logout, setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const userJSON = localStorage.getItem('user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const likeBlog = async (blog) => {
    try {
      const { id, ...rest } = blog
      const updatedBlog = await blogService.updateBlog(id, {
        ...rest,
        likes: rest.likes + 1,
        user: rest.user.id,
      })
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
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      <p>
        {user.name} logged in
        <button onClick={() => dispatch(logout())}>logout</button>
      </p>

      <h2>create new</h2>
      <BlogForm />

      <BlogList
        currentUser={user}
        onLikeClick={likeBlog}
        onDeleteClick={deleteBlog}
      />
    </div>
  )
}

export default App
