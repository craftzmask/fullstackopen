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
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from "./store";

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

describe("useAnecdoteStore", () => {
  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [], filter: "" });
    vi.clearAllMocks();
  });

  it("initialize and check anecdotes are sorted by votes", async () => {
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

describe("filtering", () => {
  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: "" });
    vi.clearAllMocks();
  });

  const filter = (value) => {
    const { result } = renderHook(() => useAnecdoteActions());
    act(() => result.current.filter(value));
  };

  const getResult = () => {
    const { result } = renderHook(() => useAnecdotes());
    return result;
  };

  it("return all without filter", async () => {
    expect(getResult().current).toHaveLength(mockAnecdotes.length);
  });

  it("receives a properly filtered list of anecdotes", async () => {
    filter("optimization");
    expect(getResult().current).toEqual([mockAnecdotes[2]]);
  });

  it("return empty array when no filter match", async () => {
    filter("123");
    expect(getResult().current).toHaveLength(0);
  });
});
