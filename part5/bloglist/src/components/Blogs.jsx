const Blogs = ({ user, blogs, onLikeClick, onDeleteClick }) => {
  if (blogs.length === 0) {
    return <p>No blogs has been created yet</p>;
  }
  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          user={user}
          key={blog.id}
          blog={blog}
          onLikeClick={onLikeClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
};

export default Blogs;
