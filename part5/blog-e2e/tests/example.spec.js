import { test, expect, beforeEach, describe } from "@playwright/test";

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "test",
        password: "test",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("login form is show", async ({ page }) => {
    const locator = page.getByText("log in to application");
    await expect(locator).toBeVisible();
  });

  test("can login", async ({ page }) => {
    await page.getByLabel("username").fill("test");
    await page.getByLabel("password").fill("test");
    await page.getByRole("button", { name: "login" }).click();
    await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible();
  });

  test("cannot login", async ({ page }) => {
    await page.getByLabel("username").fill("test1");
    await page.getByLabel("password").fill("test1");
    await page.getByRole("button", { name: "login" }).click();
    await expect(page.getByText("Wrong username or password")).toBeVisible();
  });
});
