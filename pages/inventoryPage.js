import { By } from "selenium-webdriver";
import BasePage from "./basePage.js";

export default class InventoryPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.inventoryTitle = By.className("title");
    this.cartButton = By.id("shopping_cart_container");
  }

  async getInventoryTitle() {
    return await this.getText(this.inventoryTitle);
  }

  async openCart() {
    await this.clickElement(this.cartButton);
  }
}
