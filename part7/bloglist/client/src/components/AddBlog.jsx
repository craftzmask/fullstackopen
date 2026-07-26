import { useState } from "react";
import { TextField, Button } from "@mui/material";

const AddBlog = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const onChange = (e, callback) => {
    callback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
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
