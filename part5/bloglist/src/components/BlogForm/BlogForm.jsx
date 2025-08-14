import { useState } from 'react'

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>title</label>
          <input
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label htmlFor='author'>author</label>
          <input
            id='author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)} />
        </div>

        <div>
          <label htmlFor='url'>url</label>
          <input
            id='url'
            value={url}
            onChange={(e) => setUrl(e.target.value)} />
        </div>

        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm