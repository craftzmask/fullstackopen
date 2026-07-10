import { useAnecdotes, useAnecdoteActions } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote } = useAnecdoteActions();
  const sortedAnedotes = anecdotes.toSorted((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnedotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
