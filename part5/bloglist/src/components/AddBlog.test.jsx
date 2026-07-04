import { beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddBlog from "./AddBlog";

test("test new blog form can create a new blog", async () => {
  const user = userEvent.setup();
  const mockHandler = vi.fn();
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  };

  const blogForm = render(<AddBlog onSubmit={mockHandler} />);
  const { container } = blogForm;

  const titleInput = container.querySelector(".title");
  const authorInput = container.querySelector(".author");
  const urlInput = container.querySelector(".url");
  const submitButton = container.querySelector("button[type='submit']");

  await user.type(titleInput, blog.title);
  await user.type(authorInput, blog.author);
  await user.type(urlInput, blog.url);
  await user.click(submitButton);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0]).toStrictEqual(blog);
});
