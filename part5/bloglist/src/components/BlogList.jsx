import Blog from './Blog'

const BlogList = ({ blogs, currentUser, onLikeClick, onDeleteClick }) => (
  <div>
    {blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        currentUser={currentUser}
        onLikeClick={onLikeClick}
        onDeleteClick={onDeleteClick} />
    )}
  </div>
)

export default BlogList