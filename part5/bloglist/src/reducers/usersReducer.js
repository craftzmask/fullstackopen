import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlicer = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = usersSlicer.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch(setUsers(users))
  }
}

export default usersSlicer.reducer
