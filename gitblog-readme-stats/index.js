import puppeteer from "puppeteer";

const startCrawling = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 }); // 열릴 브라우저 크기 설정
  await page.goto("https://devyuminkim.github.io/"); // 해당 주소로 이동함
  await page.waitForTimeout(1000); // 페이지 전부 로딩될때까지 기다림

  const titles = [];
  for (let i = 1; i <= 4; i++) {
    titles.push(
      await page.$eval(
        `#_main > article > div > div:nth-child(${i}) > article > h3 > a`,
        (el) => el.textContent
      )
    );
  }

  console.log(titles);
};

startCrawling();
