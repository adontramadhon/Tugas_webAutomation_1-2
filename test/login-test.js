import { Builder } from "selenium-webdriver";
import { expect } from "chai";
import LoginPage from "../pages/loginPage.js";
import InventoryPage from "../pages/inventoryPage.js";

describe("Login Test dengan POM", function () {
  this.timeout(30000);
  let driver;
  let loginPage;
  let inventoryPage;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
  });

  after(async function () {
    await driver.quit();
  });

  it("Berhasil login dengan user valid", async function () {
    await loginPage.navigateTo("https://www.saucedemo.com/");
    await loginPage.login("standard_user", "secret_sauce");
    const title = await inventoryPage.getInventoryTitle();
    expect(title).to.include("Products");
  });
});
