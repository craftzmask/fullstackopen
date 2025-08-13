import Blog from './Blog'

const BlogList = ({ blogs, user, onLikeClick, onRemoveClick }) => {
  return (
    <>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          onLikeClick={onLikeClick}
          onRemoveClick={onRemoveClick}
        />
      )}
    </>
  )
}

export default BlogList