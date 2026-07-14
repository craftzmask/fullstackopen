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
});
