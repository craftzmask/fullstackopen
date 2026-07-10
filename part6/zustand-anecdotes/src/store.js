import { create } from "zustand";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    initialize: (anecdotes) => set(() => ({ anecdotes })),
    add: (newAnecdote) =>
      set((state) => ({
        anecdotes: [...state.anecdotes, asObject(newAnecdote)],
      })),
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
