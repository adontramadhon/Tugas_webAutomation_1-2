import { By } from "selenium-webdriver";
import BasePage from "./basePage.js";

export default class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.usernameField = By.id("user-name");
    this.passwordField = By.id("password");
    this.loginButton = By.id("login-button");
    this.errorMessage = By.css("h3[data-test='error']");
  }

  async login(username, password) {
    await this.typeText(this.usernameField, username);
    await this.typeText(this.passwordField, password);
    await this.clickElement(this.loginButton);
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }
}
