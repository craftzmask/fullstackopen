const Blog = ({ user, blog, onLikeClick, onDeleteClick }) => {
  if (!blog) return null;

  return (
    <div className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes}{" "}
        <button onClick={() => onLikeClick(blog)} className="like-button">
          like
        </button>
      </div>
      <div>
        Added by <strong>{blog.user?.name}</strong>
      </div>
      {user.id === blog.user?.id && (
        <button className="delete-button" onClick={() => onDeleteClick(blog)}>
          remove
        </button>
      )}
    </div>
  );
};

export default Blog;
