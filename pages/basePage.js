import { By, until } from "selenium-webdriver";

export default class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async navigateTo(url) {
    await this.driver.get(url);
  }

  async clickElement(locator) {
    const element = await this.driver.findElement(locator);
    await element.click();
  }

  async typeText(locator, text) {
    const element = await this.driver.findElement(locator);
    await element.clear();
    await element.sendKeys(text);
  }

  async getText(locator) {
    const element = await this.driver.findElement(locator);
    return await element.getText();
  }

  async waitUntilVisible(locator, timeout = 5000) {
    const element = await this.driver.wait(until.elementLocated(locator), timeout);
    await this.driver.wait(until.elementIsVisible(element), timeout);
    return element;
  }
}
