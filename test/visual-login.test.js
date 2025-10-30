import { Builder } from "selenium-webdriver";
import fs from "fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import LoginPage from "../pages/loginPage.js";

describe("Visual Testing Halaman Login", function () {
  this.timeout(30000);
  let driver;
  let loginPage;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
  });

  after(async () => {
    await driver.quit();
  });

  it("Bandingkan tampilan halaman login", async () => {
    await loginPage.navigateTo("https://www.saucedemo.com/");
    await driver.manage().window().maximize();

    // Ambil screenshot halaman saat ini
    const screenshot = await driver.takeScreenshot();
    const currentImg = Buffer.from(screenshot, "base64");
    fs.writeFileSync("./current.png", currentImg);

    // Jika baseline belum ada, buat baseline baru
    if (!fs.existsSync("./baseline.png")) {
      fs.writeFileSync("./baseline.png", currentImg);
      console.log("Baseline image dibuat. Jalankan ulang test untuk membandingkan.");
      return;
    }

    // Bandingkan baseline dan current
    const img1 = PNG.sync.read(fs.readFileSync("./baseline.png"));
    const img2 = PNG.sync.read(fs.readFileSync("./current.png"));
    const { width, height } = img1;
    const diff = new PNG({ width, height });

    const diffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, {
      threshold: 0.1,
    });

    fs.writeFileSync("./diff.png", PNG.sync.write(diff));

    console.log(`Perbedaan pixel: ${diffPixels}`);
  });
});
