import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";

const UserList = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  if (query.isLoading) {
    return <p>Loading...</p>;
  }

  const users = query.data;

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
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
