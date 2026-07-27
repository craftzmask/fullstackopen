import { Link } from "react-router-dom";

const Blogs = ({ blogs }) => {
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
