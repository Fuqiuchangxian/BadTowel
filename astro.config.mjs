import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // 正式域名，用于生成 canonical 与分享链接。可在部署平台用环境变量 SITE_URL 覆盖；留空则不输出 canonical。
  site: process.env.SITE_URL || undefined,
  // 全站仍是静态页面；只有 /api/write（写博客接口）在 Vercel 上作为函数运行
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'ignore',
});
