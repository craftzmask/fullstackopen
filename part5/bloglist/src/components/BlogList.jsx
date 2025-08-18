import { useQuery } from "@tanstack/react-query";
import Blog from "./Blog/Blog";
import blogService from "../services/blogs";

const BlogList = () => {
  const query = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  if (query.isLoading) {
    return <p>Loading...</p>;
  }

  const blogs = query.data;

  return (
    <>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </>
  );
};

export default BlogList;
