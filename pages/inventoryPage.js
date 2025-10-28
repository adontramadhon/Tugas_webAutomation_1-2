const BasePage = require("./basePage");
const { By, until } = require("selenium-webdriver");

class InventoryPage extends BasePage {
  // Locator
  productSortDropdown = By.className("product_sort_container");
  inventoryItems = By.className("inventory_item_name");

  // Tunggu sampai halaman inventory tampil
  async waitForInventoryPage() {
    await this.driver.wait(
      until.elementLocated(this.productSortDropdown),
      5000
    );
  }

  // Sorting produk
  async sortProductsAZ() {
    const dropdown = await this.driver.findElement(this.productSortDropdown);
    await dropdown.click();
    await dropdown.findElement(By.css('option[value="az"]')).click();
  }

  // Ambil list nama produk setelah sorting
  async getProductNames() {
    const elements = await this.driver.findElements(this.inventoryItems);
    const names = [];
    for (let el of elements) {
      names.push(await el.getText());
    }
    return names;
  }
}

module.exports = InventoryPage;
