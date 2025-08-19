import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import userService from "../services/users";

const User = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", id],
    queryFn: () => userService.get(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>{data.name}</h2>
      <strong>added blogs</strong>
      <ul>
        {data.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
