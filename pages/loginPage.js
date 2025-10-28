const BasePage = require("./basePage");
const { By } = require("selenium-webdriver");

class LoginPage extends BasePage {
  usernameInput = By.id("user-name");
  passwordInput = By.id("password");
  loginButton = By.id("login-button");

  async login(username, password) {
    await this.driver.findElement(this.usernameInput).sendKeys(username);
    await this.driver.findElement(this.passwordInput).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
  }
}

module.exports = LoginPage;
