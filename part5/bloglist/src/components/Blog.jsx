import { useState } from 'react'

const Blog = ({ blog, user, onLikeClick, onRemoveClick  }) => {
  const [showDetail, setShowDetail] = useState(false)

  console.log(blog)

  const handleLikeClick = async () => {
    await onLikeClick({
      ...blog,
      likes: blog.likes + 1
    })
  }

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetail(!showDetail)}>
          {showDetail ? 'hide' : 'view'}
        </button>
      </div>

      {showDetail && (
        <div>
          <div>{blog.url}</div>
          <div>
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