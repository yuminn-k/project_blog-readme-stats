"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome_1 = require("selenium-webdriver/chrome");
const fs = __importStar(require("fs"));
/**
 * 크롤링을 위한 코드
 * 이 코드는 크롬 브라우저를 headless 모드로 실행하고, 지정된 URL로 이동한 다음 선택자를 사용하여 요소를 찾습니다.
 * 마지막으로 요소에서 텍스트를 추출하고 콘솔에 출력합니다.
 * 브라우저를 종료하려면 quit() 메서드를 호출합니다.
 */
const options = new chrome_1.Options();
options.headless(); // headless 모드로 실행
const driver = new selenium_webdriver_1.Builder()
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
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield driver.get("https://devyuminkim.github.io/lifelog/");
    const element = yield driver.findElement(selenium_webdriver_1.By.css("#_main > article > ul:nth-child(3) > li:nth-child(1) > a > span"));
    const text = yield element.getText();
    console.log(text);
    fs.writeFileSync("data.txt", text);
    yield driver.quit();
}))();
