import { create } from "zustand";
import anecdoteService from "./services/anecdotes";

/** Anecdote store */
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
    vote: async (anecdote) => {
      const savedAnecdote = await anecdoteService.update({
        ...anecdote,
        votes: anecdote.votes + 1,
      });

      set((state) => ({
        anecdotes: state.anecdotes.map((a) =>
          a.id === savedAnecdote.id ? savedAnecdote : a,
        ),
      }));
    },
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

/** Notification store */
const useNotificationStore = create((set) => ({
  message: "",
  actions: {
    notify: (message, duration) => {
      set(() => ({ message }));
      setTimeout(() => {
        set(() => ({ message: "" }));
      }, duration);
    },
  },
}));

export const useNotificationMessage = () => {
  return useNotificationStore((state) => state.message);
};

export const useNotificationActions = () => {
  return useNotificationStore((state) => state.actions);
};
