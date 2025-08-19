import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Link as MUILink,
  Button,
  IconButton,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from "@mui/material";

import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { useBlog } from "../../hooks";
import { useUsernValue } from "../../reducers/userReducer";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import blogService from "../../services/blogs";
import CommentForm from "../CommentForm";

const Blog = () => {
  const { likeBlog, removeBlog } = useBlog();
  const user = useUsernValue();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blogs", id],
    queryFn: () => blogService.get(id),
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

  const handleLikeClick = () => {
    likeBlog(data, user);
    queryClient.invalidateQueries({ queryKey: ["blogs"] });
  };

  const handleRemoveClick = async () => {
    removeBlog(data);
    await queryClient.invalidateQueries({ queryKey: ["blogs"] });
    navigate("/");
  };

  return (
    <Stack spacing={3}>
      <Card variant="outlined">
        <CardHeader title={data.title} subheader={data.author} sx={{ pb: 0 }} />

        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <MUILink
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
            >
              {data.url}
            </MUILink>
            <OpenInNewIcon fontSize="small" />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton aria-label="like blog" onClick={handleLikeClick}>
              <ThumbUpAltOutlinedIcon />
            </IconButton>
            <Typography variant="body2">Likes: {data.likes}</Typography>
          </Stack>
        </CardContent>

        <CardActions sx={{ pt: 0 }}>
          {user?.username === data.user?.username && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteOutlineIcon />}
              onClick={() => handleRemoveClick(data)}
            >
              Remove
            </Button>
          )}
        </CardActions>
      </Card>

      <Box>
        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>

        <CommentForm blogId={data.id} />

        <Divider sx={{ my: 2 }} />
        <Card variant="outlined" sx={{ p: 2 }}>
          {data.comments.length === 0 ? (
            <Typography>No comments yet</Typography>
          ) : (
            <>
              {data.comments.map((c) => (
                <ListItem key={c} disableGutters>
                  <ListItemText primary={c} />
                </ListItem>
              ))}
            </>
          )}
        </Card>
      </Box>
    </Stack>
  );
};

export default Blog;
