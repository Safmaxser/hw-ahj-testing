import puppeteer from "puppeteer";

describe("testing scenarios - entering card number", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });
    page = await browser.newPage();
  });

  test("testing the scenario - entering a valid card number", async () => {
    expect.assertions(2);
    await page.goto("http://localhost:9000");
    await page.waitForSelector(".credit-card-validator");
    const widget = await page.$(".credit-card-validator");
    const form = await widget.$(".form-validator");
    const input = await form.$(".input-validator");
    const submit = await form.$(".submit-validator");
    await input.type("4485292032285529");
    await submit.click();
    const notice = await widget.$(".notice");
    const result = await notice.evaluate((el) => el.textContent);
    const color = await notice.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.color;
    });
    expect(result).toBe("The card is valid!");
    expect(color).toBe("rgb(0, 128, 0)");
  }, 30000);

  test("testing the scenario - entering invalid card number", async () => {
    expect.assertions(2);
    await page.goto("http://localhost:9000");
    await page.waitForSelector(".credit-card-validator");
    const widget = await page.$(".credit-card-validator");
    const form = await widget.$(".form-validator");
    const input = await form.$(".input-validator");
    const submit = await form.$(".submit-validator");
    await input.type("1144557331886255");
    await submit.click();
    const notice = await widget.$(".notice");
    const result = await notice.evaluate((el) => el.textContent);
    const color = await notice.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.color;
    });
    expect(result).toBe("The card is not valid!");
    expect(color).toBe("rgb(255, 0, 0)");
  }, 30000);

  afterAll(async () => {
    await browser.close();
  });
});
