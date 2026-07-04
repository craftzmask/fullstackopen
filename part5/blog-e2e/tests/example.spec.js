import { test, expect, beforeEach, describe } from "@playwright/test";

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("login form is show", async ({ page }) => {
    const locator = page.getByText("log in to application");
    await expect(locator).toBeVisible();
  });
});
