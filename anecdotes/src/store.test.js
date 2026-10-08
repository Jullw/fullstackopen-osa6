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
});

// describe("useNoteActions", () => {
//   it("initialize loads notes from service", async () => {
//     const mockNotes = [{ id: 1, content: "Test", important: false }];
//     noteService.getAll.mockResolvedValue(mockNotes);

//     const { result } = renderHook(() => useNoteActions());

//     await act(async () => {
//       await result.current.initialize();
//     });

//     const { result: notesResult } = renderHook(() => useNotes());
//     expect(notesResult.current).toEqual(mockNotes);
//   });

//   it("add appends a new note", async () => {
//     const newNote = { id: 2, content: "New note", important: false };
//     noteService.createNew.mockResolvedValue(newNote);

//     const { result } = renderHook(() => useNoteActions());

//     await act(async () => {
//       await result.current.add("New note");
//     });

//     const { result: notesResult } = renderHook(() => useNotes());
//     expect(notesResult.current).toContainEqual(newNote);
//   });

//   it("toggleImportance flips important flag", async () => {
//     const note = { id: 1, content: "Test", important: false };
//     useNoteStore.setState({ notes: [note] });
//     noteService.update.mockResolvedValue({ ...note, important: true });

//     const { result } = renderHook(() => useNoteActions());

//     await act(async () => {
//       await result.current.toggleImportance(1);
//     });

//     const { result: notesResult } = renderHook(() => useNotes());
//     expect(notesResult.current[0].important).toBe(true);
//   });
// });
