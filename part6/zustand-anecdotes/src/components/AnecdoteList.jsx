import {
  useAnecdotes,
  useAnecdoteActions,
  useNotificationActions,
} from "../store";

const AnecdoteList = () => {
  const { notify } = useNotificationActions();
  const anecdotes = useAnecdotes();
  const { vote } = useAnecdoteActions();
  const sortedAnedotes = anecdotes.toSorted((a, b) => b.votes - a.votes);

  const handleVote = async (anecdote) => {
    await vote(anecdote);
    notify(`You voted ${anecdote.content}`, 5000);
  };

  return (
    <div>
      {sortedAnedotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
