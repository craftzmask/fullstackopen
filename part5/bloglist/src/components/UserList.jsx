import { Link } from "react-router-dom";
import userService from "../services/users";
import { useQuery } from "@tanstack/react-query";

const UserList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u) => (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
