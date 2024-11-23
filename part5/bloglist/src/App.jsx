import { useEffect } from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

import blogService from './services/blogs'

import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { logout, setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import UserList from './components/UserList'
import User from './components/User'

const App = () => {
  const currentUser = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const match = useMatch('/users/:id')
  const user = match ? users.find((u) => u.id === match.params.id) : null

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const userJSON = localStorage.getItem('user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  if (currentUser === null) {
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
        {currentUser.name} logged in
        <button onClick={() => dispatch(logout())}>logout</button>
      </p>

      <h2>create new</h2>
      <BlogForm />

      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/users/:id' element={<User user={user} />} />
      </Routes>
    </div>
  )
}

export default App
