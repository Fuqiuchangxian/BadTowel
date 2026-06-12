# BadTowel 个人网站

毛巾坏 / badtowel 的个人创作网站，集诗歌、音乐、博客、笔记、个人介绍、AI 助手于一体。

## 技术栈

- **Astro** — 静态站点生成
- **Tailwind CSS** — 样式
- **Decap CMS** — 后台管理（原 Netlify CMS）
- **Fuse.js** — 客户端模糊搜索
- **小米 MiMo API** — AI 对话与语音合成（mimo-v2-flash / mimo-v2.5-pro / mimo-v2.5-tts）

---

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 AI 功能（可选）

编辑 `src/ai-config.ts`，填入你的 MiMo API Key：

```ts
apiKey: 'your-api-key-here',
```

### 3. 启动开发服务器

```bash
npm run dev
```

浏览器打开 `http://localhost:4321` 即可预览。

### 4. 构建生产版本

```bash
npm run build
npm run preview
```

---

## 放置你的图片

```
public/
└── images/
    ├── hero/
    │   └── background.jpg      ← 首页全屏背景图（横向，≥1920px 宽）
    ├── mascot/
    │   └── mascot.png          ← 吉祥物图片（PNG 透明背景，约 100×100）
    ├── music-art/
    │   └── song-001-art.png    ← 曲绘图片（PNG 透明背景）
    └── blog/
        └── *.jpg / *.png       ← 博客文章插图
```

---

## 站点配置

所有全局配置集中在 **`src/config.ts`**：

| 配置项 | 说明 |
|--------|------|
| `heroSentences` | 首页打字机轮播句子列表 |
| `heroImage` | 首页背景图路径 |
| `mascotImage` | 吉祥物图片路径 |
| `about.body` | 关于页信件正文 |
| `about.signature` | 署名 |
| `socialLinks` | 社交平台链接列表 |

---

## 管理内容

### 方式一：直接编辑 Markdown 文件

内容存放在 `src/content/` 目录下：

```
src/content/
├── poems/         诗歌（每首一个 .md 文件）
├── songs/         音乐（每首一个 .md 文件）
├── blogs/         博客（每篇一个 .md 文件）
└── notes/         笔记（每篇一个 .md 文件）
```

每个 `.md` 文件的 frontmatter（`---` 之间的部分）包含元数据。

#### 新建一首诗

在 `src/content/poems/` 下创建新文件，如 `my-new-poem.md`：

```markdown
---
title: "诗的标题"
date: "2025-12-25"
collection: "诗集名"
backstory: "创作背景..."
---
诗的正文
每一行就是一行诗
空行分隔段落
```

#### 新建一首歌

```markdown
---
title: "歌曲标题"
date: "2025-12-25"
album: "专辑名"
platforms:
  - name: "网易云"
    url: "https://music.163.com/song?id=xxx"
artImage: "/images/music-art/xxx.png"
notes: "创作手记..."
---
歌词正文
```

#### 新建博客（支持行内关联）

```markdown
---
title: "文章标题"
date: "2025-12-25"
links:
  - text: "《公无渡河》"
    type: "poem"
    targetId: "poem-001"
---
正文中用 {{显示文字||类型||文件名}} 插入关联引用。
```

#### 新建笔记

```markdown
---
title: "笔记标题"
date: "2025-12-25"
categories:
  - "产品"
  - "思考"
---
# 标题会自动生成浮动目录
正文支持完整 Markdown。
```

### 方式二：Decap CMS 后台

1. 将项目部署到 Vercel / Netlify
2. 修改 `public/admin/config.yml` 中的 `repo` 为你的 GitHub 仓库地址
3. 访问 `你的域名/admin` 进入后台

---

## AI 助手（小毛巾）

基于小米 MiMo API 的 AI 助手，深度集成网站内容。

### 功能

| 功能 | 说明 |
|------|------|
| 🎯 推荐作品 | 根据心情和兴趣推荐诗歌/音乐/博客/笔记 |
| 🔍 深度解读 | 对作品进行赏析和解读 |
| ✨ 创作灵感 | 基于网站内容激发灵感 |
| 💬 聊天陪伴 | 用中文自然对话 |
| 🧠 深度思考 | 切换 mimo-v2.5-pro 模型进行深度推理 |
| 🔊 声声入耳 | TTS 语音合成，支持 4 种音色和自定义风格 |

### 使用方式

- **导航栏**：点击"小毛巾"按钮进入 AI 助手页面
- **搜索框**：输入文字按回车，自动跳转 AI 助手发送
- **文章划线**：选中文字后可"问问小毛巾"或"声声入耳"（朗读）

### 声声入耳（TTS）

在对话中发送类似以下消息即可触发朗读：

- `读读这一句：拥抱千万个的你` — 直接朗读指定文字
- `读读这个` — AI 从上文自动识别要朗读的内容（调用独立 API 提取）
- `再生成一遍` — 重新打开上一条朗读卡片

朗读卡片支持选择音色（冰糖/茉莉/苏打/白桦）和自定义风格描述（如"深情低语"、"东北话"等）。

### 快捷操作按钮

输入框上方提供快捷操作栏：推荐作品、创作灵感、读读这个、再生成、了解网站。

### 频率限制

- 每小时最多 50 次交互
- 每天最多 100 次交互
- 超限时小毛巾会提示等待时间

### API 配置

编辑 `src/ai-config.ts`：

| 配置项 | 说明 |
|--------|------|
| `apiKey` | MiMo API Key |
| `apiEndpoint` | API 端点（开发环境使用 `/api/mimo` 代理） |
| `model` | 快速对话模型（mimo-v2-flash） |
| `deepModel` | 深度思考模型（mimo-v2.5-pro） |
| `systemPrompt` | 系统提示词 |

---

## 交互功能

### 文字选择工具栏

在诗歌、歌词、博客、笔记的文章区域选中文字后，弹出浮动工具栏：

- **划线** — 青绿色高亮标记（点击可取消，防重复划线）
- **问问小毛巾** — 跳转 AI 助手解读选中文字
- **声声入耳** — 跳转 AI 助手朗读选中文字

### 划线后点击

- **复制** — 一键复制文字
- **问问小毛巾** — 跳转 AI 助手解读
- **声声入耳** — 跳转 AI 助手朗读面板
- **取消划线** — 移除高亮

### 回到顶部

阅读内容滚动超过 300px 后，右下角自动出现回到顶部按钮。

---

## 部署

### Vercel（推荐）

1. 将代码推送到 GitHub
2. 在 [vercel.com](https://vercel.com) 导入项目
3. 框架自动识别为 Astro，直接部署
4. 每次 push 到 main 分支自动重新部署

### Netlify

1. 在 [netlify.com](https://netlify.com) 导入 GitHub 仓库
2. 构建命令：`npm run build`
3. 发布目录：`dist`

---

## 项目结构

```
badtowel-site/
├── public/
│   ├── admin/              Decap CMS 后台
│   ├── images/             所有图片资源
│   ├── scripts/
│   │   └── markdown.js     Markdown 渲染工具
│   └── favicon.svg
├── src/
│   ├── config.ts           ★ 站点全局配置
│   ├── ai-config.ts        ★ AI 助手配置（API Key、模型、提示词）
│   ├── layouts/
│   │   └── BaseLayout.astro    全局布局（导航、回到顶部、划线工具栏）
│   ├── components/
│   │   └── Navbar.astro        导航栏（搜索、小毛巾入口）
│   ├── pages/
│   │   ├── index.astro         首页
│   │   ├── poetry.astro        诗歌
│   │   ├── music.astro         音乐
│   │   ├── blog.astro          博客
│   │   ├── notes.astro         笔记
│   │   ├── about.astro         关于
│   │   └── assistant.astro     ★ AI 助手（小毛巾）
│   ├── content/            ★ 所有内容（Markdown）
│   │   ├── config.ts       内容 Schema 定义
│   │   ├── poems/
│   │   ├── songs/
│   │   ├── blogs/
│   │   └── notes/
│   ├── data/               CMS 管理的 JSON 数据
│   └── styles/
│       └── global.css      全局样式
├── astro.config.mjs        Astro 配置（含 API 代理）
├── tailwind.config.mjs
├── package.json
└── README.md
```

---

## 页面功能一览

| 页面 | 功能 |
|------|------|
| **首页** | 全屏背景图 + 打字机文字轮播 + 吉祥物 |
| **诗歌** | 左栏列表 + 诗集筛选 + 右栏阅读 + 段落呼吸间距 + 可拖动「创作背记」弹窗 |
| **音乐** | 左栏列表 + 专辑筛选 + 平台外链 + 歌词展示 + 段落间距 + 可拖动「创作手记」弹窗 |
| **博客** | 左栏列表 + Markdown 正文 + 行内内容关联（点击弹出可拖动浮层） |
| **笔记** | 左栏列表 + 分类筛选 + 浮动目录面板（自动从标题生成，可拖动） |
| **关于** | 居中单栏信件排版 + 社交平台外链 |
| **小毛巾** | AI 对话 + 流式输出 + 深度思考 + 多轮对话 + 历史记录 + TTS 朗读 |

---

## 自定义主题色

编辑 `src/styles/global.css` 中的 CSS 变量：

```css
:root {
    --color-accent: #00395A;       /* 主色（深蓝） */
    --color-accent-light: #144767;  /* 主色浅 */
}