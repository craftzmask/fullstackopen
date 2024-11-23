import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { notify } from './notificationReducer'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const id = action.payload.id
      return state.map((b) => (b.id !== id ? b : action.payload))
    },
    removeBlog(state, action) {
      const id = action.payload.id
      return state.filter((b) => b.id !== id)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.createBlog(blog)
      dispatch(appendBlog(newBlog))
      dispatch(notify(`Added ${newBlog.title} by ${newBlog.author}`, 'success'))
    } catch (err) {
      dispatch(notify(err.response.data.error, 'error'))
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const { id, ...rest } = blog
      const updatedBlog = await blogService.updateBlog(id, {
        ...rest,
        likes: rest.likes + 1,
        user: rest.user.id,
      })
      dispatch(updateBlog(updatedBlog))
      dispatch(
        notify(`Like ${updatedBlog.title} by ${updatedBlog.author}`, 'success')
      )
    } catch (err) {
      dispatch(notify(err.response.data.error, 'error'))
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    if (confirm(`Remove ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        dispatch(removeBlog(blog))
        dispatch(notify(`Deleted ${blog.title} by ${blog.author}`, 'success'))
      } catch (err) {
        dispatch(notify(err.response.data.error, 'error'))
      }
    }
  }
}

export default blogsSlice.reducer
