import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("./services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    add: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}));

import anecdoteService from "./services/anecdotes";
import useAnecdoteStore, {
  asObject,
  useAnecdotes,
  useAnecdoteActions,
} from "./store";

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: "" });
  vi.clearAllMocks();
});

describe("useAnecdoteStore", () => {
  it("initialize anecdotes from service", async () => {
    const mockAnecdotes = [asObject("If it hurts, do it more often")];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdoteResults } = renderHook(() => useAnecdotes());
    expect(anecdoteResults.current).toEqual(mockAnecdotes);
  });

  it("anecdotes are sorted by votes", async () => {
    const mockAnecdotes = [
      {
        content: "If it hurts, do it more often",
        id: "47145",
        votes: 1,
      },
      {
        content: "Adding manpower to a late software project makes it later!",
        id: "21149",
        votes: 2,
      },
      {
        content: "Premature optimization is the root of all evil.",
        id: "21149",
        votes: 3,
      },
    ];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdoteResults } = renderHook(() => useAnecdotes());
    expect(anecdoteResults.current).toEqual(
      mockAnecdotes.toSorted((a, b) => b.votes - a.votes),
    );
  });
});
