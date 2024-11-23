import { useSelector } from 'react-redux'
import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ currentUser }) => {
  const blogs = useSelector((state) => state.blogs)

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} currentUser={currentUser} />
      ))}
    </div>
  )
}

BlogList.propTypes = {
  currentUser: PropTypes.object.isRequired,
}

export default BlogList
