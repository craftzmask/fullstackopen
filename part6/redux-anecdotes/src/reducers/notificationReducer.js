import { createSlice } from '@reduxjs/toolkit'

const notificationSlicer = createSlice({
  name: 'notification',
  initialState: 'Test Notification',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const { setNotification, removeNotification } = notificationSlicer.actions

export default notificationSlicer.reducer