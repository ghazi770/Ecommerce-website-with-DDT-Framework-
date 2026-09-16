import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../Base/BasePage';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  // Public so tests can assert on them
  readonly loginErrorMsg: Locator;
  readonly logoutLink: Locator;
  readonly loggedInAs: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('input[data-qa="login-email"]');
    this.passwordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loginErrorMsg = page.locator('.login-form p');

    this.loggedInAs = page.getByText(/Logged in as/i);
    this.logoutLink = page.locator('a[href="/logout"]');
  }

  async navigate() {
    await this.goto('/login');
    await this.waitForVisible(this.emailInput);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    await this.loginErrorMsg.waitFor({ state: 'visible' });
    return (await this.loginErrorMsg.textContent())?.trim() ?? '';
  }

  async logout() {
    await this.logoutLink.click();
  }

  async assertPasswordFieldMasked() {
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
  }
}