import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, onLikeClick, onRemoveClick  }) => {
  const [showDetail, setShowDetail] = useState(false)

  const handleLikeClick = async () => {
    await onLikeClick({
      ...blog,
      likes: blog.likes + 1
    })
  }

  return (
    <div className="blog">
      <div>
        <span className="blog__title">{blog.title}</span>
        <span className="blog__author">{blog.author}</span>
        <button onClick={() => setShowDetail(!showDetail)}>
          {showDetail ? 'hide' : 'view'}
        </button>
      </div>

      {showDetail && (
        <div>
          <div className="blog__url">{blog.url}</div>
          <div className="blog__likes">
            likes {blog.likes}
            <button onClick={handleLikeClick}>
              like
            </button>
          </div>
          <div>{blog.author}</div>

          {user.username === blog.user?.username && (
            <button onClick={() => onRemoveClick(blog)}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired
}