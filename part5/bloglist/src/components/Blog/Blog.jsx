import { useBlog } from "../../hooks";
import { useUsernValue } from "../../reducers/userReducer";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import blogService from "../../services/blogs";
import CommentForm from "../CommentForm";

const Blog = () => {
  const { likeBlog, removeBlog } = useBlog();
  const user = useUsernValue();
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blogs", id],
    queryFn: () => blogService.get(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div>
        <h2>{data.title}</h2>
        <a className="blog__url" href={data.url}>
          {data.url}
        </a>
        <div className="blog__likes">
          likes {data.likes}
          <button
            className="blog__button__like"
            onClick={() => likeBlog(data, user)}
          >
            like
          </button>
        </div>
        <div>{data.author}</div>

        {user.username === data.user?.username && (
          <button
            className="blog__button__remove"
            onClick={() => removeBlog(data)}
          >
            remove
          </button>
        )}
      </div>

      <h2>comments</h2>
      <CommentForm blogId={data.id} />
      <ul>
        {data.comments.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
