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

let blogComponent;
let simulatorUser;
let mockHandler;

beforeEach(() => {
  simulatorUser = userEvent.setup();
  mockHandler = vi.fn();
  blogComponent = render(
    <Blog user={user} blog={blog} onLikeClick={mockHandler} />,
  );
});

test("render blog", () => {
  expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeVisible();
  expect(screen.getByText(blog.url, { exact: false })).not.toBeVisible();
  expect(screen.getByText(blog.likes, { exact: false })).not.toBeVisible();
});

test("show url and likes when user click show button", async () => {
  const button = screen.getByText("show");
  await simulatorUser.click(button);
  expect(screen.getByText(blog.url, { exact: false })).toBeVisible();
  expect(screen.getByText(blog.likes, { exact: false })).toBeVisible();
});

test("user can click like button twice once it shows", async () => {
  const showButton = screen.getByText("show");
  await simulatorUser.click(showButton);

  const { container } = blogComponent;
  const likeButton = container.querySelector(".like-button");

  await simulatorUser.click(likeButton);
  await simulatorUser.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
