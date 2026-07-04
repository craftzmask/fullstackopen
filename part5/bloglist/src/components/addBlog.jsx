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
        <label>
          title
          <input
            className="title"
            type="text"
            value={title}
            onChange={(e) => onChange(e, setTitle)}
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input
            className="author"
            type="text"
            value={author}
            onChange={(e) => onChange(e, setAuthor)}
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input
            className="url"
            type="text"
            value={url}
            onChange={(e) => onChange(e, setUrl)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AddBlog;
