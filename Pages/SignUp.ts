import { Page, Locator } from '@playwright/test';
import { BasePage } from '../Base/BasePage';

export class SignUpPage extends BasePage {
  // Initial signup form
  private readonly nameInput: Locator;
  private readonly signupEmail: Locator;
  private readonly signUpButton: Locator;

  // Account Information form
  private readonly titleMr: Locator;
  private readonly passwordInput: Locator;
  private readonly daySelect: Locator;
  private readonly monthSelect: Locator;
  private readonly yearSelect: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly address: Locator;
  private readonly country: Locator;
  private readonly state: Locator;
  private readonly city: Locator;
  private readonly zipCode: Locator;
  private readonly mobile: Locator;
  private readonly createAccountButton: Locator;

  constructor(page: Page) {
    super(page);

    // Initial form
    this.nameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmail = page.locator('input[data-qa="signup-email"]');
    this.signUpButton = page.locator('button[data-qa="signup-button"]');

    // Account Information form
    this.titleMr = page.locator('#id_gender1');
    this.passwordInput = page.locator('input[data-qa="password"]');
    this.daySelect = page.locator('#days');
    this.monthSelect = page.locator('#months');
    this.yearSelect = page.locator('#years');
    this.firstName = page.locator('#first_name');
    this.lastName = page.locator('#last_name');
    this.address = page.locator('#address1');
    this.country = page.locator('#country');
    this.state = page.locator('#state');
    this.city = page.locator('#city');
    this.zipCode = page.locator('#zipcode');
    this.mobile = page.locator('#mobile_number');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
  }

  async navigate() {
    await this.goto('/login');
    await this.waitForVisible(this.signupEmail);
  }

  /** Step 1 – Name + Email */
  async signUp(name: string, email: string) {
    await this.nameInput.fill(name);
    await this.signupEmail.fill(email);
    await this.signUpButton.click({ force: true });
  }

  /** Step 2 – Fill Account Information form */
  async fillAccountInformation(data: {
    password: string;
    day: string;
    month: string;
    year: string;
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    mobile: string;
  }) {
    await this.titleMr.check();
    await this.passwordInput.fill(data.password);

    await this.daySelect.selectOption(data.day);
    await this.monthSelect.selectOption(data.month);
    await this.yearSelect.selectOption(data.year);

    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.address.fill(data.address);
    await this.country.selectOption(data.country);
    await this.state.fill(data.state);
    await this.city.fill(data.city);
    await this.zipCode.fill(data.zipCode);
    await this.mobile.fill(data.mobile);

    await this.createAccountButton.click();
  }
}