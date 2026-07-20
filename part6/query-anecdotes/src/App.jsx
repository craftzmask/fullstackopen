import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import AnecdoteList from "./components/AnecdoteList";
import { useAnecdotes } from "./hooks/useAnecdotes";

const App = () => {
  const { anecdotes, isPending, isError } = useAnecdotes();

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
      <AnecdoteList anecdotes={anecdotes} />
    </div>
  );
};

export default App;
