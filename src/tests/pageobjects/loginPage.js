const { expect } = require('@playwright/test');

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator("input[placeholder='Username']");
    this.passwordInput = page.locator("input[placeholder='Password']");
    this.usernameList = page.locator('div.login_credentials');
    this.passwordList = page.locator('div.login_password');
    this.logo = page.locator('.login_logo');
    this.image = page.locator('.bot_column');
    this.userNameTxt = '#user-name';
    this.passwordTxt = '#password';
    this.loginButton = '#login-button';
    this.error = page.locator('.error-message-container.error');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async usernameAndPasswordFields() {
    await expect(this.usernameInput).toHaveAttribute('type', 'text');
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
  }

  async loginBtn() {
    await expect(this.page.locator('#login-button')).toHaveAttribute('type', 'submit');
    await expect(this.page.locator('#login-button')).toBeVisible();
  }

  async loginImg() {
    await expect(this.page.locator('.bot_column')).toBeVisible();
  }

  async loginLogo() {
    expect(await this.page.title()).toBe('Swag Labs');
    await expect(this.logo).toHaveCSS('text-align', 'center');
  }

  async login(username, password) {
    await this.page.fill(this.userNameTxt, username);
    await this.page.fill(this.passwordTxt, password);
    await this.page.click(this.loginButton);
  }

  async loginWithBlankUsernameField(password) {
    await this.page.fill(this.passwordTxt, password);
    await this.page.click(this.loginButton);
  }

  async loginWithBlankPasswordField(username) {
    await this.page.fill(this.userNameTxt, username);
    await this.page.click(this.loginButton);
  }

}