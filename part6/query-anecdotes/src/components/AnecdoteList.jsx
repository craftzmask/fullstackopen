import { useAnecdotes } from "../hooks/useAnecdotes";

const AnecdoteList = ({ anecdotes }) => {
  const { voteAnecdote } = useAnecdotes();

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
