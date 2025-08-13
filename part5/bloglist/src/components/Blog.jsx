import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetail, setShowDetail] = useState(false)


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
            <button>like</button>
          </div>
          <div>{blog.author}</div>
        </div>
      )}
    </div>  
  )
}

export default Blog