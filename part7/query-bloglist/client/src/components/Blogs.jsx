import { Link } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";

const Blogs = () => {
  const { blogs, isPending } = useBlogs();

  if (isPending) return null;

  return (
    <div>
      <h2>blogs</h2>
      {blogs.length === 0 && <p>No blogs has been created yet</p>}
      <ul>
        {blogs.map((b) => (
          <li key={b.id}>
            <Link key={b.id} to={`/blogs/${b.id}`}>
              {b.title} by {b.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
