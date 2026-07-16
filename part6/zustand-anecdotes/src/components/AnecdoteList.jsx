import {
  useAnecdotes,
  useAnecdoteActions,
  useNotificationActions,
} from "../store";

const AnecdoteList = () => {
  const { notify } = useNotificationActions();
  const anecdotes = useAnecdotes();
  const { vote, remove } = useAnecdoteActions();

  const handleVote = async (anecdote) => {
    await vote(anecdote);
    notify(`You voted ${anecdote.content}`, 5000);
  };

  const handleRemove = async (anecdote) => {
    if (confirm(`Are you sure that you want to remove "${anecdote.content}"`)) {
      await remove(anecdote);
      notify(`You removed ${anecdote.content}`, 5000);
    }
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 && (
              <button onClick={() => handleRemove(anecdote)}>remove</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
