import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import anecdoteService from "./services/anecdotes";

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: "",
  actions: {
    vote: async (id) => {
      const anecdote = get().anecdotes.find((a) => a.id === id);
      const updated = await anecdoteService.update(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });
      set((state) => ({
        anecdotes: state.anecdotes
          .map((anecdote) => (anecdote.id === id ? updated : anecdote))
          .toSorted((a, b) => b.votes - a.votes),
      }));
    },

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

let notificationTimeout;

const useNotificationStore = create((set) => ({
  show: false,
  text: "",
  duration: 0,
  actions: {
    setNotification: (text, duration) => {
      clearTimeout(notificationTimeout);
      set(() => ({ show: true, text, duration }));
      notificationTimeout = setTimeout(() => {
        set(() => ({ show: false, text: "", duration: 0 }));
      }, duration * 1000);
    },
  },
}));

export const useNotificationValues = () =>
  useNotificationStore(
    useShallow((state) => ({
      show: state.show,
      text: state.text,
      duration: state.duration,
    })),
  );

export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);
