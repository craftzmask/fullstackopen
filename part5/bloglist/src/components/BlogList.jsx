import Blog from './Blog'

const BlogList = ({ blogs, onLikeClick }) => {
  return (
    <>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          onLikeClick={onLikeClick}
        />
      )}
    </>
  )
}

export default BlogList