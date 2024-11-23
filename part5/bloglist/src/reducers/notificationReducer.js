import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return { message: null, status: null }
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const notify = (message, status) => {
  return async (dispatch) => {
    dispatch(
      setNotification({
        message,
        status,
      })
    )
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer
