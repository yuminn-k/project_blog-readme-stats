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

async function run() {
  await driver.get("https://devyuminkim.github.io/lifelog/");

  const element = await driver.findElement(
    By.css("#_main > article > ul:nth-child(3) > li:nth-child(1) > a > span")
  );

  const text = await element.getText();

  console.log(text);

  fs.writeFileSync("data.txt", text);

  await driver.quit();
}

run();

// Do something with the search results

// import * as puppeteer from "puppeteer";
// import fs from "fs";

// const SITE_URL = "https://devyuminkim.github.io/lifelog/"; // https://devyuminkim.github.io/devlog/

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(SITE_URL);

//   // 원하는 데이터 추출
//   const dataElement = await page.$(
//     "#_main > article > ul:nth-child(3) > li:nth-child(1) > a > span"
//   );
//   // <span>우아한테크세미나 - 테크 리더 3인이 말하는 ‘개발자 원칙’ 후기</span>
//   // document.querySelector("#_main > article > ul:nth-child(3) > li:nth-child(1) > a > span")
//   if (dataElement) {
//     const dataText = await page.evaluate(
//       (element) => element.textContent,
//       dataElement
//     );
//     if (dataText) {
//       fs.writeFileSync("data.txt", dataText);
//       console.log("데이터를 파일에 저장하였습니다.");
//     } else {
//       console.log("해당 요소를 찾을 수 없습니다.");
//     }

//     console.log(dataText);
//   } else {
//     console.log("해당 요소를 찾을 수 없습니다.");
//   }

//   await browser.close();
// })();
