import { test, expect, beforeEach, describe } from "@playwright/test";

const loginWith = async (page, username, password) => {
  await page.getByLabel("username").fill(username);
  await page.getByLabel("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByLabel("title").fill(title);
  await page.getByLabel("author").fill(author);
  await page.getByLabel("url").fill(url);
  await page.getByRole("button", { name: "create" }).click();
};

const user = {
  name: "Matti Luukkainen",
  username: "test",
  password: "test",
};

const blog = {
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
};

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: user,
    });
    await page.goto("http://localhost:5173");
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
});
