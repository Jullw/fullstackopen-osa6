import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

const useReviewStore = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  all: 0,
  actions: {
    plusGood: () =>
      set((state) => ({
        good: state.good + 1,
        all: state.all + 1,
      })),
    plusNeutral: () =>
      set((state) => ({
        neutral: state.neutral + 1,
        all: state.all + 1,
      })),
    plusBad: () =>
      set((state) => ({
        bad: state.bad + 1,
        all: state.all + 1,
      })),
  },
}));

export const useReviewValues = () =>
  useReviewStore(
    useShallow((state) => ({
      good: state.good,
      neutral: state.neutral,
      bad: state.bad,
      all: state.all,
    })),
  );

export const useReviewActions = () => {
  return useReviewStore((state) => state.actions);
};
