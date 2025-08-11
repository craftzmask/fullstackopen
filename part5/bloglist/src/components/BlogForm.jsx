const BlogForm = ({
  title,
  author,
  url,
  onTitleChange,
  onAuthorChange,
  onUrlChange,
  onSubmit
}) => {

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit({ title, author, url })
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
            onChange={onTitleChange} />
        </div>

        <div>
          <label htmlFor='author'>author</label>
          <input
            id='author'
            value={author}
            onChange={onAuthorChange} />
        </div>

        <div>
          <label htmlFor='url'>url</label>
          <input
            id='url'
            value={url}
            onChange={onUrlChange} />
        </div>

        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm