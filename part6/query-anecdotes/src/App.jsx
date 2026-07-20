import { useState } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useAnecdotes } from "./hooks/useAnecdotes";
import NotificationContext from "./NotificationContext";

const App = () => {
  const { anecdotes, isPending, isError, voteAnecdote } = useAnecdotes();
  const [notification, setNotification] = useState("");

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Server is not available due to problem on server</p>;
  }

  const handleVote = (anecdote) => {
    voteAnecdote(anecdote);
    setNotification(`${anecdote.content} voted`);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export default App;
