import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(createBlog({ title, author, url }))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>title:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name='title'
            type='text'
            id='title'
            data-testid='title'
          />
        </div>
        <div>
          <label htmlFor='author'>author:</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            name='author'
            type='text'
            id='author'
            data-testid='author'
          />
        </div>
        <div>
          <label htmlFor='url'>url:</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            name='url'
            type='text'
            id='url'
            data-testid='url'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm
