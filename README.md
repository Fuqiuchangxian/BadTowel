# JUNHAO / LAB

马均昊的个人网站。在 AI 时代，持续构建产品、研究传播，也保留一点古法手搓。

基于 [Astro](https://astro.build) 构建的纯静态网站，无第三方追踪、无外部字体依赖。

## 改内容

**几乎所有文案和链接都在 [`src/data/site.ts`](src/data/site.ts)**，改完保存即可。

| 想做的事 | 改哪里 |
| --- | --- |
| 补上 Email / GitHub / LinkedIn / 简历 | `site.ts` 里的 `contacts`，填 `href`。邮箱写 `mailto:xxx@xx.com`；简历 PDF 放进 `public/`，写 `/resume.pdf` |
| 加一段经历 | `experience` 数组里加一项（按时间倒序） |
| 加一个项目 | `projects` 数组 |
| 加一个作品 | `experiments.works`；想要封面图就把图放到 `public/works/`，并填 `cover: '/works/xxx.jpg'` |
| 加一首歌 | `experiments.music.videos` 里加 B 站 BV 号 |
| 博客上线 | `thinking.blogHref` 填链接 |
| 脚本审核 Agent 案例页 | [`src/pages/work/review-agent.astro`](src/pages/work/review-agent.astro) |
| 颜色 / 字号 / 间距 | [`src/styles/global.css`](src/styles/global.css) 顶部的 CSS 变量 |

## 本地预览

```bash
npm install
npm run dev
```

打开 http://localhost:4321

## 发布

```bash
npm run build
```

产物在 `dist/`，是纯静态文件，放到任何静态托管都可以：

- **Vercel / Netlify**：导入仓库，框架选 Astro，其余默认即可。
- **GitHub Pages**：用官方 `withastro/action` 工作流。
- **国内访问优先**：把 `dist/` 上传到阿里云 OSS / 腾讯云 COS 静态网站托管（使用国内域名需备案）。

发布前把 [`astro.config.mjs`](astro.config.mjs) 里的 `site` 改成你的正式域名。
