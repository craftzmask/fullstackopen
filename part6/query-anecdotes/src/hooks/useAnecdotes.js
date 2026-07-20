import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAnecdote,
  getAnecdotes,
  updateAnecdote,
} from "../services/anecdotes";
import useNotify from "./useNotify";

export const useAnecdotes = () => {
  const { notify } = useNotify();
  const client = useQueryClient();

  const { isPending, isError, data } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      client.invalidateQueries({ queryKey: ["anecdotes"] });
      notify(`${anecdote.content} voted`);
    },
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      client.invalidateQueries({ queryKey: ["anecdotes"] });
      notify(`${anecdote.content} created`);
    },
    onError: () => {
      notify("too short anecdote, must have length 5 or more");
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
