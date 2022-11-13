import { test, expect } from '@playwright/test';

test('Check index page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('heading', { name: 'Michelin-starred restaurants we have visited so far' });
  await page.getByRole('link', { name: 'Some fancy statistics' }).click();
  await expect(page).toHaveURL('/statistics');
  
});

test('Check if restaurant blocks are rendered', async ({ page }) => {
  await page.goto('/');
  await page.locator('.row > div:nth-child(3) > div');
  await page.locator('div:has-text("6 5 5")').nth(1);
})
