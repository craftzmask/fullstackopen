import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, currentUser, onLikeClick, onDeleteClick }) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const detail = () => (
    <div data-testid='blog-detail'>
      <div data-testid='blog-url' className='blog-url'>
        {blog.url}
      </div>

      <div data-testid='blog-likes'>
        likes: {blog.likes}
        <button onClick={() => onLikeClick(blog)}>like</button>
      </div>

      <div>{blog.user && blog.user.name}</div>
      {currentUser.username === blog.user.username && (
        <button onClick={() => onDeleteClick(blog)}>delete</button>
      )}
    </div>
  )

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetail(!showDetail)}>
          {showDetail ? 'hide' : 'view'}
        </button>
      </div>
      {showDetail && detail()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default Blog
