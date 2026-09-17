import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../Base/BasePage';

export class SignUpPage extends BasePage {
  private readonly signupEmail: Locator;
  private readonly nameInput: Locator;
  private readonly signUpButton: Locator;

  // Locator on Sign Up Page 

private readonly signUpTitle: Locator;
private readonly SignUpPassword: Locator;
private readonly DayDrop: Locator;
private readonly MonthDrop: Locator;
private readonly YearDrop: Locator;

private readonly AddressFirstName: Locator;
private readonly AddressLastName: Locator;
private readonly Address: Locator;
private readonly Country: Locator;
private readonly State: Locator;
private readonly City: Locator;
private readonly ZipCode: Locator;
private readonly MobilePhone: Locator;
private readonly CreateAccountButton: Locator;

  constructor(page: Page) {
    super(page);
    this.signupEmail = page.locator('input[data-qa="signup-email"]');
    this.nameInput = page.locator('input[data-qa="signup-name"]');
    this.signUpButton = page.locator('button[data-qa="signup-button"]');

    // Locator on Sign Up Page

    this.signUpTitle = page.locator('input[id="id_gender1"]');
    this.SignUpPassword = page.locator('input[data-qa="login-password"]');

    // Drop Down Locator on Sign Up Page
    this.DayDrop = page.locator('select[id="days"]');
    this.MonthDrop = page.locator('select[id="months"]');
    this.YearDrop = page.locator('select[id="years"]');

   // Address Information Locator on Sign Up Page
   this.AddressFirstName = page.locator('input[id="first_name"]');
   this.AddressLastName = page.locator('input[id="last_name"]');
   this.Address = page.locator('input[id="address1"]');
   this.Country = page.locator('select[id="country"]');
   this.State = page.locator('input[id="state"]');
   this.City = page.locator('input[id="city"]');
   this.ZipCode = page.locator('input[id="zipcode"]');
   this.MobilePhone = page.locator('input[id="phone"]');
   this.CreateAccountButton = page.locator('button[data-qa="create-account"]');
    

}



  async navigate() {
    await this.goto('/login');
    await this.waitForVisible(this.signupEmail);
  }

  async signUp(email: string, name: string) {
    await this.signupEmail.fill(email);
    await this.nameInput.fill(name);
    await this.signUpButton.click();
  }


async signUp_Page(name: string,signupEmail: string , password: string,firstName: string,
      lastName: string, address: string, country: string, state: string, 
    city: string, zipCode: string, mobilePhone: string)
     {
     await this.signUpTitle.click();
     await this.nameInput.fill(name);
     await this.signupEmail.fill(signupEmail);
     await this.SignUpPassword.fill(password);

     await this.DayDrop.selectOption('8');
     await this.MonthDrop.selectOption('August');
     await this.YearDrop.selectOption('1990');


     await this.AddressFirstName.fill(firstName);
     await this.AddressLastName.fill(lastName);
     await this.Address.fill(address);
     await this.Country.selectOption(country);
     await this.State.fill(state);
     await this.City.fill(city);
     await this.ZipCode.fill(zipCode);
     await this.MobilePhone.fill(mobilePhone);

     await this.CreateAccountButton.click();
   
  }

  
}