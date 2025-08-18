import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../../services/blogs";

const BlogForm = ({ onCloseForm, notify }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setTitle("");
      setAuthor("");
      setUrl("");
      onCloseForm();
      notify(`a new blog ${newBlog.title} added`, "success");
    },
    onError: (exception) => {
      notify(exception.response.data.error, "error");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    newBlogMutation.mutate({ title, author, url });
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
