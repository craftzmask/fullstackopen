import { beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const user = {
  username: "username",
  name: "name",
};

const blog = {
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
};

beforeEach(() => {
  const mockHandler = vi.fn();
  render(<Blog user={user} blog={blog} onLikeClick={mockHandler} />);
});

test("render blog", () => {
  expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeVisible();
  expect(screen.getByText(blog.url, { exact: false })).not.toBeVisible();
  expect(screen.getByText(blog.likes, { exact: false })).not.toBeVisible();
});

test("show url and likes when user click show button", async () => {
  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);
  expect(screen.getByText(blog.url, { exact: false })).toBeVisible();
  expect(screen.getByText(blog.likes, { exact: false })).toBeVisible();
});
