import { Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string) {
    await this.page.goto(path);
  }

  async waitForVisible(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
  }
}