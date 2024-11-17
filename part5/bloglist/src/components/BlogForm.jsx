const BlogForm = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <label htmlFor='title'>title:</label> 
        <input
          value={props.title}
          onChange={props.onTitleChange}
          name='title'
          type='text'
          id='title'
        />
      </div>
      <div>
        <label htmlFor='author'>author:</label> 
        <input
          value={props.author}
          onChange={props.onAuthorChange}
          name='author'
          type='text'
          id='author'
        />
      </div>
      <div>
        <label htmlFor='url'>url:</label> 
        <input
          value={props.url}
          onChange={props.onUrlChange}
          name='url'
          type='text'
          id='url'
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm