import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, currentUser, onLikeClick, onDeleteClick }) => (
  <div>
    {blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        currentUser={currentUser}
        onLikeClick={onLikeClick}
        onDeleteClick={onDeleteClick}
      />
    ))}
  </div>
)

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default BlogList
