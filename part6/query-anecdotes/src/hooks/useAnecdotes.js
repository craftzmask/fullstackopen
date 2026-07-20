import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAnecdote,
  getAnecdotes,
  updateAnecdote,
} from "../services/anecdotes";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

export const useAnecdotes = () => {
  const { setNotification } = useContext(NotificationContext);
  const client = useQueryClient();

  const { isPending, isError, data } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["anecdotes"] });
    },
    onError: () => {
      setNotification("too short anecdote, must have length 5 or more");
      setTimeout(() => {
        setNotification("");
      }, 5000);
    },
  });

  return {
    anecdotes: data,
    isPending,
    isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    voteAnecdote: (anecdote) =>
      voteAnecdoteMutation.mutate({
        ...anecdote,
        votes: anecdote.votes + 1,
      }),
  };
};
