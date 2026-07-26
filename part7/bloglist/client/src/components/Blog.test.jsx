import { beforeEach, describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const user = {
  id: "1",
  username: "author",
  name: "author",
};

const testUser = {
  id: "123",
  username: "test",
  name: "test",
};

const blog = {
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
  user,
};

const verifyUserCanSeeBlogInfo = (screen) => {
  expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeVisible();
  expect(screen.getByText(blog.url, { exact: false })).toBeVisible();
  expect(screen.getByText(blog.likes, { exact: false })).toBeVisible();
};

describe("Blog component visibility based on authorization", () => {
  let mockLikeHandler;
  let mockDeleteHandler;
  let simulatorUser;

  beforeEach(() => {
    simulatorUser = userEvent.setup();
    mockLikeHandler = vi.fn();
    mockDeleteHandler = vi.fn();
  });

  test("unauthenticated users see blog info and likes, but no buttons", () => {
    // Omitting the user prop simulates an unauthenticated state
    render(
      <Blog
        blog={blog}
        onLikeClick={mockLikeHandler}
        onDeleteClick={mockDeleteHandler}
      />,
    );

    verifyUserCanSeeBlogInfo(screen);

    // The like and remove buttons are not in the document
    expect(
      screen.queryByRole("button", { name: "like" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "remove" }),
    ).not.toBeInTheDocument();
  });

  describe("authenticated but not author of the blog", () => {
    beforeEach(() => {
      render(
        <Blog
          user={testUser}
          blog={blog}
          onLikeClick={mockLikeHandler}
          onDeleteClick={mockDeleteHandler}
        />,
      );
    });

    test("authenticated user but not the author of the blog can only see the like button", () => {
      verifyUserCanSeeBlogInfo(screen);

      // Only like button is visible
      expect(screen.getByRole("button", { name: "like" })).toBeVisible();
      expect(
        screen.queryByRole("button", { name: "remove" }),
      ).not.toBeInTheDocument();
    });

    test("authenticated users can click like button", async () => {
      const likeButton = screen.getByRole("button", { name: "like" });
      await simulatorUser.click(likeButton);
      await simulatorUser.click(likeButton);
      expect(mockLikeHandler).toHaveBeenCalledTimes(2);
    });
  });

  describe("authenticated but also author of the blog", () => {
    test("the blog's author can see both like and remove buttons", () => {
      render(
        <Blog
          user={user}
          blog={blog}
          onLikeClick={mockLikeHandler}
          onDeleteClick={mockDeleteHandler}
        />,
      );

      verifyUserCanSeeBlogInfo(screen);

      // The like and remove buttons are both in the document
      expect(screen.getByRole("button", { name: "like" })).toBeVisible();
      expect(screen.getByRole("button", { name: "remove" })).toBeVisible();
    });

    test("the blog's author can click on remove button", async () => {
      render(
        <Blog
          user={user}
          blog={blog}
          onLikeClick={mockLikeHandler}
          onDeleteClick={mockDeleteHandler}
        />,
      );

      const removeButton = screen.getByRole("button", { name: "remove" });
      await simulatorUser.click(removeButton);
      expect(mockDeleteHandler).toHaveBeenCalledTimes(1);
    });
  });
});
