import { useState } from "react";
import { useBlog } from "../../hooks";

const BlogForm = ({ onCloseForm }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const { createBlog } = useBlog();

  const handleSubmit = (e) => {
    e.preventDefault();
    createBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
    onCloseForm();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title</label>
          <input
            data-testid="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="author">author</label>
          <input
            data-testid="author"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="url">url</label>
          <input
            data-testid="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <button data-testid="blog-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
