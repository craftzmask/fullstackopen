import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { useUserStore, useBlogActions } from "../store";
import { useNavigate, useParams } from "react-router-dom";
import { useNotificationDispatch } from "../context/NotificationContext";
import { useBlogs } from "../hooks/useBlogs";

const Blog = () => {
  const { user } = useUserStore();
  const { blogs, isPending } = useBlogs();
  const { likeBlog, deleteBlog } = useBlogActions();
  const notify = useNotificationDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  if (isPending) return null;

  const blog = blogs.find((b) => b.id === id);

  const handleLike = async (blog) => {
    try {
      const likedBlog = await likeBlog(blog);
      notify(`Liked ${likedBlog.title} by ${likedBlog.author}`);
    } catch (error) {
      console.log(error);
      notify(error.response.data.error, "error");
    }
  };

  const handleDelete = async (blog) => {
    try {
      if (confirm(`Deleted blog ${blog.title} by ${blog.author}?`)) {
        await deleteBlog(blog);
        notify(`Deleted ${blog.title} by ${blog.author}`);
        navigate("/");
      }
    } catch (error) {
      notify(error.response.data.error, "error");
    }
  };

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
