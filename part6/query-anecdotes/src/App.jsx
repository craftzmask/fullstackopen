import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useAnecdotes } from "./hooks/useAnecdotes";

const App = () => {
  const { anecdotes, isPending, isError, voteAnecdote } = useAnecdotes();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Server is not available due to problem on server</p>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

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

export default App;
