import { test, expect, beforeEach, describe } from "@playwright/test";
import { loginWith, createBlog, user, user1, blog } from "./helper";

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", { data: user });

    // Second user for testing unauthorized
    await request.post("/api/users", { data: user1 });
    await page.goto("/");
  });

  describe("Authentication operations", () => {
    test("Login form shown to unauthenticated users", async ({ page }) => {
      await page.getByRole("link", { name: "login" }).click();
      const locator = page.getByText("log in to application");
      await expect(locator).toBeVisible();
    });

    test("Login succeeds with the correct username/password combination", async ({
      page,
    }) => {
      await loginWith(page, user.username, user.password);
      await expect(page.getByText(`Welcome back ${user.name}`)).toBeVisible();
    });

    test("Login fails if the username/password is incorrect", async ({
      page,
    }) => {
      await loginWith(page, "wrong username", "wrong password");
      await expect(page.getByText("Wrong username or password")).toBeVisible();
    });
  });

  describe("Authenticated user and author of the blog", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, user.username, user.password);
    });

    test("A logged-in user can create a blog", async ({ page }) => {
      await page.getByRole("link", { name: "new blog" }).click();
      await createBlog(page, blog.title, blog.author, blog.url);
      await expect(
        page.getByText(`Added ${blog.title} succesfully`),
      ).toBeVisible();
      await expect(
        page.getByText(`${blog.title} by ${blog.author}`),
      ).toBeVisible();
    });

    test("A logged-in user can like blogs", async ({ page }) => {
      await page.getByRole("link", { name: "new blog" }).click();
      await createBlog(page, blog.title, blog.author, blog.url);
      await page
        .getByRole("link", { name: `${blog.title} by ${blog.author}` })
        .click();
      await page.getByRole("button", { name: "like" }).click();
      await expect(
        page.getByText(`Liked ${blog.title} by ${blog.author}`),
      ).toBeVisible();
    });

    test("A logged-in user can delete his/her blog", async ({ page }) => {
      await page.getByRole("link", { name: "new blog" }).click();
      await createBlog(page, blog.title, blog.author, blog.url);
      await page
        .getByRole("link", { name: `${blog.title} by ${blog.author}` })
        .click();

      page.on("dialog", async (dialog) => await dialog.accept());
      await page.getByRole("button", { name: "remove" }).click();

      await expect(
        page.getByText(`Deleted ${blog.title} by ${blog.author}`),
      ).toBeVisible();

      await expect(
        page.getByText(`${blog.title} ${blog.author}`),
      ).not.toBeVisible();

      await expect(
        page.getByText("No blogs has been created yet"),
      ).toBeVisible();
    });

    test("A logged-in user cannot delete other blog", async ({ page }) => {
      await page.getByRole("link", { name: "new blog" }).click();
      await createBlog(page, blog.title, blog.author, blog.url);

      await page.getByRole("button", { name: "logout" }).click();
      await page.waitForTimeout(1000);
      await loginWith(page, user1.username, user1.password);

      await page
        .getByRole("link", { name: `${blog.title} by ${blog.author}` })
        .click();
      await page.waitForTimeout(1000);

      await expect(page.getByRole("button", { name: "like" })).toBeVisible();
      await expect(
        page.getByRole("button", { name: "remove" }),
      ).not.toBeVisible();
    });
  });
});
