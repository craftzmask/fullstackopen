import React from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link as RouterLink } from "react-router-dom";
import userService from "../services/users";

const User = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", id],
    queryFn: () => userService.get(id),
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box mt={2}>
        <Alert severity="error">Error: {error.message}</Alert>
      </Box>
    );
  }

  const blogs = data?.blogs ?? [];

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <Typography variant="h5">{data.name}</Typography>
        <Chip
          label={`${blogs.length} blog${blogs.length === 1 ? "" : "s"}`}
          size="small"
        />
      </Box>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Added blogs
      </Typography>

      {blogs.length ? (
        <List dense>
          {blogs.map((b, idx) => (
            <React.Fragment key={b.id}>
              <ListItem
                disableGutters
                component={RouterLink}
                to={`/blogs/${b.id}`} // adjust if your route differs
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": { backgroundColor: "action.hover" },
                  borderRadius: 1,
                  px: 1,
                }}
              >
                <ListItemText primary={b.title} />
              </ListItem>
              {idx < blogs.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No blogs added yet.
        </Typography>
      )}
    </Paper>
  );
};

export default User;
