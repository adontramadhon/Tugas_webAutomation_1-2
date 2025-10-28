const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function buildDriver() {
  let options = new chrome.Options();
  options.addArguments("--start-maximized");
  options.addArguments("--disable-gpu");
  options.addArguments("--no-sandbox");
  options.addArguments("--disable-dev-shm-usage");

  const service = new chrome.ServiceBuilder(require("chromedriver").path);

  return await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .setChromeService(service)
    .build();
}

module.exports = { buildDriver };
