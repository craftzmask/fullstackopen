import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import { test, expect, vi } from "vitest";

test("blog form can be filled and submitted", async () => {
  const blog = {
    author: "Jane Doe",
    title: "Mastering Distributed Systems",
    url: "https://example.com/mastering-distributed-systems",
  };

  const mockHandler = vi.fn();
  const { container } = render(<BlogForm onSubmit={mockHandler} />);

  const title = container.querySelector("#title");
  const author = container.querySelector("#author");
  const url = container.querySelector("#url");

  const user = userEvent.setup();
  await user.type(title, blog.title);
  await user.type(author, blog.author);
  await user.type(url, blog.url);

  const submitButton = container.querySelector('button[type="submit"]');
  await user.click(submitButton);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0]).toStrictEqual(blog);
});
