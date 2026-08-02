import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useBlogActions } from "../store";
import { useNavigate } from "react-router-dom";
import { useNotificationDispatch } from "../hooks/useNotification";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const notify = useNotificationDispatch();
  const { createBlog } = useBlogActions();
  const navigate = useNavigate();

  const onChange = (e, callback) => {
    callback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBlog = await createBlog({ title, author, url });
      notify(`Added ${newBlog.title} succesfully`);
      setTitle("");
      setAuthor("");
      setUrl("");
      navigate("/");
    } catch (error) {
      notify(error.response.data.error, "error");
    }
  };

  return (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={handleSubmit} style={{ width: 500 }}>
        <div style={{ marginTop: 10 }}>
          <TextField
            fullWidth
            label="title"
            value={title}
            onChange={(e) => onChange(e, setTitle)}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <TextField
            fullWidth
            label="author"
            value={author}
            onChange={(e) => onChange(e, setAuthor)}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <TextField
            fullWidth
            label="url"
            value={url}
            onChange={(e) => onChange(e, setUrl)}
          />
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          create
        </Button>
      </form>
    </div>
  );
};

export default AddBlog;
