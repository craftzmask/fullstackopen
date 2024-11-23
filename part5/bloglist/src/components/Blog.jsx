import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [showDetail, setShowDetail] = useState(false)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

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
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </div>

      <div>{blog.user && blog.user.name}</div>
      {user.username === blog.user.username && (
        <button onClick={() => dispatch(deleteBlog(blog))}>delete</button>
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
}

export default Blog
