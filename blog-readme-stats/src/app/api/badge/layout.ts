import { NextApiRequest, NextApiResponse } from "next";
import https from "https";
import { JSDOM } from "jsdom";

const createBadge = (name: string) => {
  const size = name.length * 9;
  return `
  <svg width="117" height="34" viewBox="0 0 117 34" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
      .name{ fill: #ffffff; font-weight: 500; font-size: 13px;}
  </style>
  <svg width="98" height="25" viewBox="0 0 98 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
          <rect x="22" width="${size}" height="25" fill="#20C997"/>
          <text x="30" y="17" class="name">${name}</text>
      </g>
      <path d="M3.125 0H21.875C23.6009 0 25 1.39911 25 3.125V21.875C25 23.6009 23.6009 25 21.875 25H3.125C1.39911 25 0 23.6009 0 21.875V3.125C0 1.39911 1.39911 0 3.125 0Z" fill="#20C997"/>
      <path d="M18.6199 8.526V7.54163C17.9949 7.3385 17.2605 7.11975 16.4167 6.88538C15.573 6.63538 15.0027 6.51038 14.7058 6.51038C14.0496 6.51038 13.6589 6.82288 13.5339 7.44788L12.0105 16.0963C11.5261 15.4557 11.1277 14.9166 10.8152 14.4791C10.3308 13.7916 9.8855 13.0026 9.47925 12.1119C9.05737 11.2213 8.84644 10.4244 8.84644 9.72131C8.84644 9.29944 8.96362 8.9635 9.198 8.7135C9.41675 8.44788 9.83081 8.11194 10.4402 7.70569C9.81519 6.90881 9.03393 6.51038 8.09643 6.51038C7.59644 6.51038 7.18237 6.65881 6.85425 6.95569C6.5105 7.25256 6.33862 7.69006 6.33862 8.26819C6.33862 9.23694 6.74487 10.4479 7.55737 11.901C8.35425 13.3385 9.89331 15.5026 12.1746 18.3932L14.4949 18.5573L16.2761 8.526H18.6199Z" fill="white"/>
  </svg>
</svg>`;
};

const getLatestBlogTitle = async () => {
  return new Promise<string>((resolve, reject) => {
    const url = "https://yuminnk-devlog.vercel.app/";
    https
      .get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          const dom = new JSDOM(data);
          const selector =
            "#__next>div:nth-child(2)>div>div.notion-frame>div>main>div.notion-page-content>article>div.notion-collection.notion-block-52c3f72df427430ca4768e53c36a61c6>div:nth-child(2)>div>div";
          const element = dom.window.document.querySelector(selector);

          if (!element) reject("Element not found");

          resolve(element.textContent.trim());
        });
      })
      .on("error", (err) => {
        reject(err.message);
      });
  });
};

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const blogTitle = await getLatestBlogTitle();
    const svg = createBadge(blogTitle);

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
};
