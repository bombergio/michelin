import { test, expect } from "@playwright/test"

test("Index page links to statistics", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1 })).toContainText("restaurants.")
  await page.getByRole("navigation").getByRole("link", { name: "Statistics" }).click()
  await expect(page).toHaveURL("/statistics")
})

test("Restaurant entries are rendered", async ({ page }) => {
  await page.goto("/")
  await expect(page.locator(".entry").first()).toBeVisible()
  await expect(page.locator(".entry h3").first()).not.toBeEmpty()
})
