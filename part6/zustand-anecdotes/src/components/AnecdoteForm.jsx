import { useAnecdoteActions, useNotificationActions } from "../store";

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();
  const { notify } = useNotificationActions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await add(e.target.anecdote.value);
    notify(`You added ${e.target.anecdote.value}`, 5000);
    e.target.reset();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
