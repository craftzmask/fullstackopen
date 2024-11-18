import Blog from './Blog'

const BlogList = ({ blogs, onClick }) => (
  <div>
    {blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        onClick={onClick} />
    )}
  </div>
)

export default BlogList