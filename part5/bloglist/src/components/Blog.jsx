import { useState } from 'react'

const Blog = ({ blog, onLikeClick  }) => {
  const [showDetail, setShowDetail] = useState(false)

  const handleLikeClick = async () => {
    await onLikeClick({
      ...blog,
      user: blog.user.id, 
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
        </div>
      )}
    </div>  
  )
}

export default Blog