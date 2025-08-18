import { useBlog, useField } from "../../hooks";

const BlogForm = ({ onCloseForm }) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const { createBlog } = useBlog();

  const handleSubmit = (e) => {
    e.preventDefault();
    createBlog({
      title: title.inputProps.value,
      author: author.inputProps.value,
      url: url.inputProps.value,
    });
    title.reset();
    author.reset();
    url.reset();
    onCloseForm();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title</label>
          <input data-testid="title" id="title" {...title.inputProps} />
        </div>

        <div>
          <label htmlFor="author">author</label>
          <input data-testid="author" id="author" {...author.inputProps} />
        </div>

        <div>
          <label htmlFor="url">url</label>
          <input data-testid="url" id="url" {...url.inputProps} />
        </div>

        <button data-testid="blog-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
