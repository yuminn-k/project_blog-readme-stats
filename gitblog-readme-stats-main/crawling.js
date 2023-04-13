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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = __importStar(require("puppeteer"));
const fs_1 = __importDefault(require("fs"));
const SITE_URL = "https://devyuminkim.github.io/lifelog/"; // https://devyuminkim.github.io/devlog/
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(SITE_URL);
    // 원하는 데이터 추출
    const dataElement = await page.$("#_main > article > ul:nth-child(3) > li:nth-child(1) > a > span");
    // <span>우아한테크세미나 - 테크 리더 3인이 말하는 ‘개발자 원칙’ 후기</span>
    // document.querySelector("#_main > article > ul:nth-child(3) > li:nth-child(1) > a > span")
    if (dataElement) {
        const dataText = await page.evaluate((element) => element.textContent, dataElement);
        if (dataText) {
            fs_1.default.writeFileSync("data.txt", dataText);
            console.log("데이터를 파일에 저장하였습니다.");
        }
        else {
            console.log("해당 요소를 찾을 수 없습니다.");
        }
        console.log(dataText);
    }
    else {
        console.log("해당 요소를 찾을 수 없습니다.");
    }
    await browser.close();
})();
