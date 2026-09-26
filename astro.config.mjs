import { defineConfig } from 'astro/config';

export default defineConfig({
  // 正式域名，用于生成 canonical 与分享链接。可在部署平台用环境变量 SITE_URL 覆盖；留空则不输出 canonical。
  site: process.env.SITE_URL || undefined,
  output: 'static',
  trailingSlash: 'ignore',
});
