import { useState } from "react";
import PropTypes from "prop-types";
import { useBlog } from "../../hooks";
import { useUsernValue } from "../../reducers/userReducer";

const Blog = ({ blog }) => {
  const [showDetail, setShowDetail] = useState(false);
  const { likeBlog, removeBlog } = useBlog();
  const user = useUsernValue();

  return (
    <div className="blog">
      <div>
        <span className="blog__title">{blog.title}</span>
        <span className="blog__author">{blog.author}</span>
        <button
          className="blog__button__show"
          onClick={() => setShowDetail(!showDetail)}
        >
          {showDetail ? "hide" : "view"}
        </button>
      </div>

      {showDetail && (
        <div>
          <div className="blog__url">{blog.url}</div>
          <div className="blog__likes">
            likes {blog.likes}
            <button
              className="blog__button__like"
              onClick={() => likeBlog(blog, user)}
            >
              like
            </button>
          </div>
          <div>{blog.author}</div>

          {user.username === blog.user?.username && (
            <button
              className="blog__button__remove"
              onClick={() => removeBlog(blog)}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};
