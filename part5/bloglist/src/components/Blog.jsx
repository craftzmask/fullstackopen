import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

import { likeBlog, deleteBlog, postComment } from '../reducers/blogReducer'

import CommentForm from './CommentForm'
import CommentList from './CommentList'

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

  const comment = (content) => {
    dispatch(postComment(blog, content))
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

      <h3>comments</h3>
      <CommentForm onSubmit={comment} />

      <CommentList comments={blog.comments} />
    </div>
  )
}

export default Blog
