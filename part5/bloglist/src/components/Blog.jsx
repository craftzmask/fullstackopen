import { useState } from 'react'

const Blog = ({ blog, currentUser, onLikeClick, onDeleteClick }) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const detail = () => (
    <div>
      <div>{blog.url}</div>
      <div>
        likes: {blog.likes}
        <button onClick={() => onLikeClick(blog)}>
          like
        </button>
      </div>
      <div>{blog.user && blog.user.name}</div>
      {
        currentUser.username === blog.user.username &&
        <button onClick={() => onDeleteClick(blog)}>
          delete
        </button>
      }
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
export default Blog