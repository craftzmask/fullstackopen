import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          type="text"
          value={title}
          onChange={(e) => onChange(e, setTitle)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          onChange={(e) => onChange(e, setAuthor)}
        />
      </div>
      <div>
        url
        <input type="text" value={url} onChange={(e) => onChange(e, setUrl)} />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AddBlog;
