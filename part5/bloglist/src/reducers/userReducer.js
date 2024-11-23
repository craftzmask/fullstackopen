import { createSlice } from '@reduxjs/toolkit'
import { notify } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlicer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlicer.actions

export const login = (user) => {
  return async (dispatch) => {
    try {
      const loggedInUser = await loginService.login(user)
      dispatch(setUser(loggedInUser))
      blogService.setToken(loggedInUser.token)
      localStorage.setItem('user', JSON.stringify(loggedInUser))
      dispatch(notify(`Welcome back ${loggedInUser.name}`, 'success'))
    } catch (err) {
      dispatch(notify('wrong username or password', 'error'))
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(setUser(null))
    localStorage.clear()
    dispatch(notify('See you soon', 'success'))
  }
}

export default userSlicer.reducer
