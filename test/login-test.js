const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");

describe("Saucedemo Login Tests - Tugas 2", function () {
  this.timeout(50000); // timeout tiap test

  let driver;

  // ===== before() : jalan sekali sebelum semua test =====
  before(async function () {
    let options = new chrome.Options();
    options.addArguments("--disable-gpu");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");

    const service = new chrome.ServiceBuilder(require("chromedriver").path);

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .setChromeService(service)
      .build();

    await driver.manage().window().maximize();
  });

  // ===== beforeEach() : jalan sebelum setiap test =====
  beforeEach(async function () {
    await driver.get("https://www.saucedemo.com/");
  });

  // ===== Test 1 : login valid =====
  it("Berhasil login dengan valid credentials", async function () {
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    await driver.wait(until.urlContains("inventory"), 10000);
    const currentUrl = await driver.getCurrentUrl();
    assert(currentUrl.includes("inventory"));
  });

  // ===== Test 2 : login invalid =====
  it("Gagal login dengan invalid credentials", async function () {
    await driver.findElement(By.id("user-name")).sendKeys("invalid_user");
    await driver.findElement(By.id("password")).sendKeys("wrong_password");
    await driver.findElement(By.id("login-button")).click();

    const error = await driver
      .findElement(By.css('[data-test="error"]'))
      .getText();
    assert(error.includes("Username and password do not match"));
  });

  // ===== afterEach() : jalan setelah setiap test =====
  afterEach(async function () {
    // opsional: reset state / clear input
  });

  // ===== after() : jalan sekali setelah semua test =====
  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
