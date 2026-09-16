import { test, expect } from '@playwright/test';
import loginTestData from '../data/loginData.json';
import { LoginPage } from '../Pages/Login';

test.describe('Login Module - Data-Driven Tests @DDT @POM', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  for (const data of loginTestData) {
    test(`${data.tcId} - ${data.description}`, async () => {
      await loginPage.login(data.email, data.password);

      if (data.expectedResult === 'pass') {
        await expect(loginPage.logoutLink).toBeVisible();
        await loginPage.logout();
      } else {
        await expect(loginPage.logoutLink).toBeHidden();

        if (data.expectedMessage) {
          await expect(loginPage.loginErrorMsg).toContainText(data.expectedMessage);
        }
      }
    });
  }

  test('TC_LOGIN_15 - Password field is masked', async () => {
    await loginPage.assertPasswordFieldMasked();
  });
});