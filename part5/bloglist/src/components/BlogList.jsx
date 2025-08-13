import Blog from './Blog'

const BlogList = ({ blogs, onLikeClick }) => {
  return (
    <>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
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