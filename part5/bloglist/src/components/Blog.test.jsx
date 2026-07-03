import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("render blog", () => {
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

  render(<Blog user={user} blog={blog} />);

  expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeVisible();
  expect(screen.getByText(blog.url, { exact: false })).not.toBeVisible();
  expect(screen.getByText(blog.likes, { exact: false })).not.toBeVisible();
});
