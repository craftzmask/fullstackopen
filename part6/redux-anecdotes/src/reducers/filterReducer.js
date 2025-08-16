import { createSlice } from '@reduxjs/toolkit'

const filterSlicer = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filter(state, action) {
      return action.payload
    }
  }
})

export const { filter } = filterSlicer.actions

export default filterSlicer.reducer