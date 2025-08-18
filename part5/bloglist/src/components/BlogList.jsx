import Blog from "./Blog/Blog";

const BlogList = ({ blogs, user }) => {
  return (
    <>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </>
  );
};

export default BlogList;
