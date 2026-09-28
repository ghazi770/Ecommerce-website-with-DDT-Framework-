import { test, expect } from '@playwright/test';
import { SignUpPage } from '../Pages/SignUp';

test.describe('Sign Up Module - Data-Driven Tests @DDT @POM', () => {
  let signupPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    signupPage = new SignUpPage(page);
    await signupPage.navigate();
  });

  
  test('TC_SIGNUP_15 - Sign up with valid credentials and verify success', async ({ page }) => {
  const uniqueEmail = `user_${Date.now()}@example.com`;

  await signupPage.signUp(uniqueEmail, 'password123');
  await expect(page.getByText('Enter Account Information')).toBeVisible();
});
});
