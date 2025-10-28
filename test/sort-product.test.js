const { buildDriver } = require("../utils/driver");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const assert = require("assert");

describe("Sorting Produk di SauceDemo", function () {
  this.timeout(50000);
  let driver;
  let loginPage;
  let inventoryPage;

  before(async function () {
    driver = await buildDriver();
    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);

    await loginPage.open("https://www.saucedemo.com/");
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.waitForInventoryPage();
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it("Urutkan produk dari A-Z", async function () {
    await inventoryPage.sortProductsAZ();

    const productNames = await inventoryPage.getProductNames();
    const sortedNames = [...productNames].sort();

    assert.deepStrictEqual(productNames, sortedNames);
  });
});
