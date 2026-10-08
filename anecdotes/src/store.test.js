import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("./services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
  },
}));

import anecdotesService from "./services/anecdotes";
import useAnecdotesStore, { useAnecdotes, useAnecdotesActions } from "./store";

beforeEach(() => {
  useAnecdotesStore.setState({ anecdotes: [], filter: "" });
  vi.clearAllMocks();
});

describe("useAnecdotesStore", () => {
  it("initialize loads anecdotes from service", async () => {
    const mockAnecdotes = [{ id: 1, content: "Test", votes: 0 }];
    anecdotesService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdotesActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual(mockAnecdotes);
  });

  it("useAnecdotes returns anecdotes sorted by votes", async () => {
    const mockAnecdotes = [
      { id: 1, content: "Few votes", votes: 2 },
      { id: 2, content: "No votes", votes: 0 },
      { id: 3, content: "Most votes", votes: 10 },
    ];
    anecdotesService.getAll.mockResolvedValue(mockAnecdotes);

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    const { result } = renderHook(() => useAnecdotesActions());

    await act(async () => {
      await result.current.initialize();
    });

    expect(anecdotesResult.current).toEqual([
      mockAnecdotes[2],
      mockAnecdotes[0],
      mockAnecdotes[1],
    ]);
  });
});

describe("useFilter", () => {
  it("filter anecdotes by content", async () => {
    const mockAnecdotes = [
      { id: 1, content: "Test", votes: 0 },
      { id: 2, content: "another", votes: 0 },
      { id: 3, content: "tesit", votes: 3 },
    ];
    anecdotesService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdotesActions());

    await act(async () => {
      await result.current.initialize();
      await result.current.setFilter("Test");
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual([mockAnecdotes[0]]);
  });
});

describe("useActions", () => {
  it("vote for an anecdote", async () => {
    const mockAnecdotes = [
      { id: 1, content: "Test", votes: 3 },
      { id: 2, content: "another", votes: 0 },
      { id: 3, content: "tesit", votes: 3 },
    ];
    const updatedAnecdote = { ...mockAnecdotes[2], votes: 4 };
    anecdotesService.getAll.mockResolvedValue(mockAnecdotes);
    anecdotesService.update.mockResolvedValue(updatedAnecdote);

    const { result } = renderHook(() => useAnecdotesActions());

    await act(async () => {
      await result.current.initialize();
      await result.current.vote(mockAnecdotes[2].id);
    });

    expect(anecdotesService.update).toHaveBeenCalledWith(
      mockAnecdotes[2].id,
      updatedAnecdote,
    );

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current[0].votes).toEqual(4);
    expect(anecdotesResult.current).toEqual([
      updatedAnecdote,
      mockAnecdotes[0],
      mockAnecdotes[1],
    ]);
  });
});
