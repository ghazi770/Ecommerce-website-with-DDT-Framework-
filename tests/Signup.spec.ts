import { test, expect } from '@playwright/test';
import { SignUpPage } from '../Pages/SignUp';

test.describe('Sign Up Module - Data-Driven Tests @DDT @POM', () => {
  let signupPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    // Block ad/analytics requests BEFORE navigating
    await page.route(
      /googlesyndication|googleads|doubleclick|google-analytics|googletagmanager|adservice|pagead/,
      route => route.abort()
    );

    signupPage = new SignUpPage(page);
    await signupPage.navigate();
  });

  test('TC_SIGNUP_15 - Sign up with valid credentials and verify success', async ({ page }) => {
    const uniqueEmail = `user_${Date.now()}@example.com`;
    const password = 'Password123!';

    // Step 1 – initial signup (name + email)
    await signupPage.signUp('Test User', uniqueEmail);

    // Verify we landed on Account Information page
    await expect(page.getByText('Enter Account Information')).toBeVisible();

    // Step 2 – complete the Account Information form
    await signupPage.fillAccountInformation({
      password,
      day: '15',
      month: '6',
      year: '1990',
      firstName: 'Test',
      lastName: 'User',
      address: '123 Test Street',
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      zipCode: '90001',
      mobile: '1234567890',
    });

    // Final assertion
    await expect(page.getByText('Account Created!')).toBeVisible();
  });
});