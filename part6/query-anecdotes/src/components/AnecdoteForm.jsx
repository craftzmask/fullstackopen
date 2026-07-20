import { useContext } from "react";
import { useAnecdotes } from "../hooks/useAnecdotes";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const { setNotification } = useContext(NotificationContext);

  const { addAnecdote } = useAnecdotes();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    addAnecdote(content);
    setNotification(`${content} added`);
    setTimeout(() => {
      setNotification("");
    }, 5000);
    event.target.reset();
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
