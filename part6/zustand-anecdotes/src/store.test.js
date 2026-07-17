import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import anecdoteService from "./services/anecdotes";
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from "./store";

/** Helper functions */
const getResult = () => {
  const { result } = renderHook(() => useAnecdotes());
  return result;
};

const filter = (value) => {
  const { result } = renderHook(() => useAnecdoteActions());
  act(() => result.current.filter(value));
};

const initialize = async (value) => {
  anecdoteService.getAll.mockResolvedValue(value);
  const { result } = renderHook(() => useAnecdoteActions());

  await act(async () => {
    await result.current.initialize();
  });
};

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

/** Testing */
vi.mock("./services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    add: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}));

describe("useAnecdoteStore", () => {
  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [], filter: "" });
    vi.clearAllMocks();
  });

  it("initialize and check anecdotes are sorted by votes", async () => {
    await initialize(mockAnecdotes);
    expect(getResult().current).toEqual(
      mockAnecdotes.toSorted((a, b) => b.votes - a.votes),
    );
  });

  it("voting increases the number of votes for an anecdote", async () => {
    useAnecdoteStore.setState({ anecdotes: [mockAnecdotes[0]] });
    const anecdoteToVote = mockAnecdotes[0];
    anecdoteService.update.mockResolvedValue({
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    });

    const { result } = renderHook(() => useAnecdoteActions());
    await act(async () => {
      await result.current.vote(anecdoteToVote);
    });

    expect(getResult().current[0].votes).toBe(anecdoteToVote.votes + 1);
  });
});

describe("filtering", () => {
  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: "" });
    vi.clearAllMocks();
  });

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
