import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { Link } from "react-router-dom";

const BlogList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} className="blog">
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default BlogList;
