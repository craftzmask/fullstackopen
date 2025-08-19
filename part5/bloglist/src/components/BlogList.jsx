import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { Link } from "react-router-dom";

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

const BlogList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Blog Title</TableCell>
            <TableCell>Author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BlogList;
