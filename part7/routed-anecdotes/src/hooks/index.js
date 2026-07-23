import { useEffect, useState } from "react";
import anecdoteService from "../services/anecdotes";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    fields: {
      type,
      value,
      onChange,
    },
    reset,
  };
};

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    anecdoteService.getAll().then((data) => setAnecdotes(data));
  }, []);

  const addAnecdote = async (anecdote) => {
    const addedAnecdote = await anecdoteService.createNew(anecdote);
    setAnecdotes(anecdotes.concat(addedAnecdote));
  };

  const deleteAnecdote = async (anecdote) => {
    if (confirm(`Are you sure to delete ${anecdote.content}`)) {
      await anecdoteService.remove(anecdote);
      setAnecdotes(anecdotes.filter((a) => a.id !== anecdote.id));
    }
  };

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote,
  };
};
