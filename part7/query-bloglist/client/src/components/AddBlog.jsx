import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useNotificationActions } from "../hooks/useNotification";
import { useBlogs } from "../hooks/useBlogs";
import { useField } from "../hooks/useField";

const AddBlog = () => {
  const title = useField("title");
  const author = useField("title");
  const url = useField("title");
  const navigate = useNavigate();
  const { notify } = useNotificationActions();
  const { addBlog } = useBlogs();

  const handleSubmit = async (e) => {
    e.preventDefault();
    addBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    });
    notify(`Added ${title.value} succesfully`);
    navigate("/");
  };

  return (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={handleSubmit} style={{ width: 500 }}>
        <div style={{ marginTop: 10 }}>
          <TextField fullWidth {...title} />
        </div>
        <div style={{ marginTop: 10 }}>
          <TextField fullWidth {...author} />
        </div>
        <div style={{ marginTop: 10 }}>
          <TextField fullWidth {...url} />
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          create
        </Button>
      </form>
    </div>
  );
};

export default AddBlog;
