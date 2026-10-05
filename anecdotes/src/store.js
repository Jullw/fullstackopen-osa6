import { create } from "zustand";
import anecdoteService from "./services/anecdotes";

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    vote: (id) =>
      set((state) => ({
        anecdotes: state.anecdotes
          .map((anecdote) =>
            anecdote.id === id
              ? { ...anecdote, votes: anecdote.votes + 1 }
              : anecdote,
          )
          .toSorted((a, b) => b.votes - a.votes),
      })),

    create: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content);
      set((state) => ({
        anecdotes: [...state.anecdotes, newAnecdote],
      }));
    },

    setFilter: (keyword) => set(() => ({ filter: keyword })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes }));
    },
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);

  if (filter) {
    return anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  return anecdotes;
};
export const useFilter = () => useAnecdoteStore((state) => state.filter);
export const useAnecdotesActions = () =>
  useAnecdoteStore((state) => state.actions);
