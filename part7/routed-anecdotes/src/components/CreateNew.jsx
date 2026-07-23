import { useNavigate } from "react-router-dom";
import { useAnecdotes, useField } from "../hooks/index";

const CreateNew = () => {
  const { addAnecdote } = useAnecdotes();
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAnecdote({
      content: content.fields.value,
      author: author.fields.value,
      info: info.fields.value,
      votes: 0,
    });
    navigate("/");
  };

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.fields} />
        </div>
        <div>
          author
          <input {...author.fields} />
        </div>
        <div>
          url for more info
          <input {...info.fields} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
