import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import anecdoteService from "./services/anecdotes";
import { useAnecdoteActions } from "./store";

const App = () => {
  const { initialize } = useAnecdoteActions();

  useEffect(() => {
    anecdoteService.getAll().then((data) => initialize(data));
  }, [initialize]);

  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
