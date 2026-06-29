const AddBlog = ({
  onSubmit,
  title,
  onTitleChange,
  author,
  onAuthorChange,
  url,
  onUrlChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        title
        <input type="text" value={title} onChange={onTitleChange} />
      </div>
      <div>
        author
        <input type="text" value={author} onChange={onAuthorChange} />
      </div>
      <div>
        url
        <input type="text" value={url} onChange={onUrlChange} />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AddBlog;
