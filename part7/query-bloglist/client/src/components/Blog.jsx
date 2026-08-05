import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useNotificationActions } from "../hooks/useNotification";
import { useBlogs } from "../hooks/useBlogs";
import { useUser } from "../hooks/useUser";

const Blog = () => {
  const user = useUser();
  const { blogs, isPending, likeBlog, deleteBlog } = useBlogs();
  const { notify } = useNotificationActions();
  const navigate = useNavigate();
  const { id } = useParams();

  if (isPending) return null;

  const handleLike = async (blog) => {
    likeBlog(blog);
    notify(`Liked ${blog.title} by ${blog.author}`);
  };

  const handleDelete = async (blog) => {
    if (confirm(`Deleted blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog);
      notify(`Deleted ${blog.title} by ${blog.author}`);
      navigate("/");
    }
  };

  const blog = blogs.find((b) => b.id === id);
  if (!blog) return null;

  return (
    <Card className="blog" sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h4" component="h4">
          {blog.title}
        </Typography>
        <Typography variant="h6" component="p" sx={{ color: "text.secondary" }}>
          by {blog.author}
        </Typography>

        <a href={blog.url}>{blog.url}</a>

        <Typography
          variant="body1"
          component="p"
          sx={{ color: "text.secondary" }}
        >
          Added by {blog.user?.name}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: "16px", pt: 0 }}>
        <Typography variant="body1" component="p">
          likes {blog.likes}{" "}
        </Typography>

        {user && (
          <Button
            variant="contained"
            className="like-button"
            onClick={() => handleLike(blog)}
          >
            Like
          </Button>
        )}

        {user?.id === blog.user?.id && (
          <Button
            variant="outlined"
            color="error"
            className="delete-button"
            onClick={() => handleDelete(blog)}
          >
            Remove
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Blog;
