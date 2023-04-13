import * as puppeteer from "puppeteer";
import fs from "fs";

const SITE_URL = "https://devyuminkim.github.io/lifelog/"; // https://devyuminkim.github.io/devlog/

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(SITE_URL);

  // 원하는 데이터 추출
  const dataElement = await page.$(
    "#_main > article > ul:nth-child(3) > li:nth-child(1) > a > span"
  );
  // <span>우아한테크세미나 - 테크 리더 3인이 말하는 ‘개발자 원칙’ 후기</span>
  // document.querySelector("#_main > article > ul:nth-child(3) > li:nth-child(1) > a > span")
  if (dataElement) {
    const dataText = await page.evaluate(
      (element) => element.textContent,
      dataElement
    );
    if (dataText) {
      fs.writeFileSync("data.txt", dataText);
      console.log("데이터를 파일에 저장하였습니다.");
    } else {
      console.log("해당 요소를 찾을 수 없습니다.");
    }

    console.log(dataText);
  } else {
    console.log("해당 요소를 찾을 수 없습니다.");
  }

  await browser.close();
})();
