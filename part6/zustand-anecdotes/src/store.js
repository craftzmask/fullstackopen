import { create } from "zustand";
import anecdoteService from "./services/anecdotes";

const asObject = (anecdote) => ({
  content: anecdote,
  votes: 0,
});

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    initialize: (anecdotes) => set(() => ({ anecdotes })),
    add: async (newAnecdote) => {
      const savedAnecdote = await anecdoteService.add(asObject(newAnecdote));
      set((state) => ({
        anecdotes: [...state.anecdotes, savedAnecdote],
      }));
    },
    vote: (id) =>
      set((state) => ({
        anecdotes: state.anecdotes.map((a) =>
          a.id === id ? { ...a, votes: a.votes + 1 } : a,
        ),
      })),
    filter: (value) => set(() => ({ filter: value })),
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);

  return filter && filter.length > 0
    ? anecdotes.filter((a) =>
        a.content.toLowerCase().includes(filter.toLowerCase()),
      )
    : anecdotes;
};

export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);
