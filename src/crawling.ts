import { Builder, By, WebDriver } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";
import * as fs from "fs";

/**
 * 크롤링을 위한 코드
 * 이 코드는 크롬 브라우저를 headless 모드로 실행하고, 지정된 URL로 이동한 다음 선택자를 사용하여 요소를 찾습니다.
 * 마지막으로 요소에서 텍스트를 추출하고 콘솔에 출력합니다.
 * 브라우저를 종료하려면 quit() 메서드를 호출합니다.
 */

const options = new Options();
options.headless(); // headless 모드로 실행

const driver: WebDriver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(options)
  .build();

// export const crawling = async () => {
//   await driver.get("https://devyuminkim.github.io/lifelog/");

//   const element = await driver.findElement(
//     By.css("#_main > article > ul:nth-child(3) > li:nth-child(1) > a > span")
//   );

//   const text = await element.getText();

//   console.log(text);

//   fs.writeFileSync("data.txt", text);

//   await driver.quit();
// };
(async () => {
  await driver.get("https://devyuminkim.github.io/lifelog/");

  const element = await driver.findElement(
    By.css("#_main > article > ul:nth-child(3) > li:nth-child(1) > a > span")
  );

  const text = await element.getText();

  console.log(text);

  fs.writeFileSync("data.txt", text);

  await driver.quit();
})();
