import * as puppeteer from "puppeteer";
import * as fs from "fs";

const SITE_URL = "https://img.shields.io/badge";
const LABEL = "Data";
const COLOR = "blue";

(async () => {
  // 파일에서 데이터 가져오기
  const dataText = fs.readFileSync("data.txt", { encoding: "utf-8" });

  // 배지 생성
  const badge = `[![${LABEL}](https://img.shields.io/badge/${LABEL}-${dataText}-${COLOR})](${SITE_URL})`;

  console.log(badge);
})();
