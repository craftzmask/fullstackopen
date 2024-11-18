import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    await onSubmit({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>title:</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          name='title'
          type='text'
          id='title'
        />
      </div>
      <div>
        <label htmlFor='author'>author:</label>
        <input
          value={author}
          onChange={e => setAuthor(e.target.value)}
          name='author'
          type='text'
          id='author'
        />
      </div>
      <div>
        <label htmlFor='url'>url:</label>
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          name='url'
          type='text'
          id='url'
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default BlogForm