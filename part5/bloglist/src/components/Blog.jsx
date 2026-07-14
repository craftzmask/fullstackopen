import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

const Blog = ({ user, blog, onLikeClick, onDeleteClick }) => {
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
            onClick={() => onLikeClick(blog)}
          >
            Like
          </Button>
        )}

        {user?.id === blog.user?.id && (
          <Button
            variant="outlined"
            color="error"
            className="delete-button"
            onClick={() => onDeleteClick(blog)}
          >
            Remove
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Blog;
