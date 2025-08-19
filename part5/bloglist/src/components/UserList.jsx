import { Link } from "react-router-dom";
import userService from "../services/users";
import { useQuery } from "@tanstack/react-query";

import {
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

const UserList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
