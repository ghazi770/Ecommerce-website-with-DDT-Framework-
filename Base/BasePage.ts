import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string) {
    // 'load' waits for ad/analytics scripts, which stalls on this site
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async waitForVisible(locator: Locator, timeout = 10_000) {
    await expect(locator).toBeVisible({ timeout });
  }
}