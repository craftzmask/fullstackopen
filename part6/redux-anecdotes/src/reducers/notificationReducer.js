import { createSlice } from '@reduxjs/toolkit'

const notificationSlicer = createSlice({
  name: 'notification',
  initialState: 'Test Notification',
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export const { setNotification } = notificationSlicer.actions

export default notificationSlicer.reducer