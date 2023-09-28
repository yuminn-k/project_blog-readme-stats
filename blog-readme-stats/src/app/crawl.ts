import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const blogTitle = "Your Latest Blog Title"; // 이 부분을 크롤링 코드로 대체하세요.
  const encodedTitle = encodeURIComponent(blogTitle);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="100">
      <rect width="100%" height="100%" fill="#555"/>
      <text x="50%" y="50%" font-family="'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" font-size="24" fill="#fff" dy=".3em" text-anchor="middle">${blogTitle}</text>
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
};
