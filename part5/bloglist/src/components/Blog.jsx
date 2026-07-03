import { useState } from "react";

const Blog = ({ user, blog, onLikeClick, onDeleteClick }) => {
  const [showDetail, setShowDetail] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  console.log(blog);
  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetail(!showDetail)}>
          {showDetail ? "hide" : "show"}
        </button>
      </div>
      <div style={{ display: showDetail ? "" : "none" }}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{" "}
          <button onClick={() => onLikeClick(blog)}>like</button>
        </div>
        <div>{blog.user?.name}</div>
        {user.username === blog.user?.username && (
          <button onClick={() => onDeleteClick(blog)}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
