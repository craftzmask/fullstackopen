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

  test("login form is show", async ({ page }) => {
    const locator = page.getByText("log in to application");
    await expect(locator).toBeVisible();
  });

  test("can login", async ({ page }) => {
    await loginWith(page, user.username, user.password);
    await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible();
  });

  test("cannot login", async ({ page }) => {
    await loginWith(page, "wrong username", "wrong password");
    await expect(page.getByText("Wrong username or password")).toBeVisible();
  });

  test("a new blog can be created", async ({ page }) => {
    await loginWith(page, user.username, user.password);
    await page.getByRole("button", { name: "create a blog" }).click();
    await createBlog(page, blog.title, blog.author, blog.url);

    await expect(
      page.getByText(`Added ${blog.title} succesfully`),
    ).toBeVisible();
    await expect(page.getByText(`${blog.title} ${blog.author}`)).toBeVisible();
  });

  test("blogs are sorted by their likes", async ({ page, request }) => {
    await request.post("/api/testing/init");
    await page.reload();
    await loginWith(page, user.username, user.password);
    await expect(page.getByText(`${user.name} logged in`)).toBeVisible();

    await page.getByRole("button", { name: "show" }).first().waitFor();
    const showButtonLocator = page.getByRole("button", { name: "show" });
    while ((await showButtonLocator.count()) > 0) {
      await showButtonLocator.first().click();
    }

    const likes = [];
    const likeTexts = await page.getByText("likes ", { exact: false }).all();
    for (const likeText of likeTexts) {
      const stringNumber = (await likeText.textContent()).split(" ")[1];
      likes.push(Number(stringNumber));
    }

    expect(likes).toEqual(likes.toSorted((a, b) => b - a));
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, user.username, user.password);
      await page.getByRole("button", { name: "create a blog" }).click();
      await createBlog(page, blog.title, blog.author, blog.url);
      await page.getByRole("button", { name: "show" }).click();
    });

    test("a blog can be liked", async ({ page }) => {
      await page.getByRole("button", { name: "like" }).click();
      await expect(
        page.getByText(`Liked ${blog.title} by ${blog.author}`),
      ).toBeVisible();
    });

    test("a blog can be remove by its owner", async ({ page }) => {
      await page.getByRole("button", { name: "remove" }).click();
      page.on("dialog", async (dialog) => await dialog.accept());
      await page.getByRole("button", { name: "remove" }).click();
      await expect(
        page.getByText(`${blog.title} ${blog.author}`),
      ).not.toBeVisible();
    });

    test("other cannot see the remove butotn", async ({ page }) => {
      await page.getByRole("button", { name: "logout" }).click();
      await loginWith(page, user1.username, user1.password);
      await page.getByRole("button", { name: "show" }).click();
      expect(page.getByRole("button", { name: "remove" })).not.toBeVisible();
    });
  });
});
