import { useDispatch, useSelector } from 'react-redux'

import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useMatch } from 'react-router-dom'

const Blog = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null

  const dispatch = useDispatch()

  const like = (blog) => {
    dispatch(likeBlog(blog))
  }

  const remove = (blog) => {
    dispatch(deleteBlog(blog))
  }

  if (!blog) return null

  return (
    <div>
      <h2>{blog.title}</h2>

      <a href={blog.url}>{blog.url}</a>

      <div>
        {blog.likes} likes
        <button onClick={() => like(blog)}>like</button>
      </div>

      <div>added by {blog.user.name}</div>

      {user?.username === blog.user.username && (
        <button onClick={() => remove(blog)}>delete</button>
      )}
    </div>
  )
}

export default Blog
