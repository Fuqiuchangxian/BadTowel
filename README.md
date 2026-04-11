# BadTowel 个人网站

毛巾坏 / badtowel 的个人创作网站，集诗歌、音乐、博客、笔记、个人介绍于一体。

## 技术栈

- **Astro** — 静态站点生成
- **Tailwind CSS** — 样式
- **Decap CMS** — 后台管理（原 Netlify CMS）
- **Fuse.js** — 客户端模糊搜索

---

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

浏览器打开 `http://localhost:4321` 即可预览。

### 3. 构建生产版本

```bash
npm run build
npm run preview    # 本地预览构建结果
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

放好图片后，如果文件名和上面一致就不用改配置。  
如果文件名不同，修改 `src/config.ts` 中对应路径即可。

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

每个 `.md` 文件的 frontmatter（`---` 之间的部分）包含元数据，  
`---` 之后是正文内容。

#### 新建一首诗

在 `src/content/poems/` 下创建新文件，如 `my-new-poem.md`：

```markdown
---
title: "诗的标题"
date: "2025-12-25"
collection: "诗集名"        # 可选，留空则不属于任何诗集
backstory: "创作背景..."    # 可选
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
album: "专辑名"             # 可选
platforms:
  - name: "网易云"
    url: "https://music.163.com/song?id=xxx"
  - name: "B站"
    url: "https://bilibili.com/video/xxx"
artImage: "/images/music-art/xxx.png"   # 可选，曲绘图片
notes: "创作手记..."        # 可选
---
歌词正文
每行一句
```

#### 新建博客（支持行内关联）

```markdown
---
title: "文章标题"
date: "2025-12-25"
links:                      # 可选，行内关联数据
  - text: "《公无渡河》"
    type: "poem"
    targetId: "poem-001"    # 目标文件名（不含 .md）
---
正文支持 Markdown 语法。

在正文中用 {{显示文字||类型||文件名}} 插入关联引用：
比如我写了一首{{公无渡河||poem||poem-001}}来表达这种心情。

读者点击带下划线的文字会弹出内容预览浮层。
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
# 一级标题

正文支持完整 Markdown：标题、段落、代码块、引用等。
标题会自动生成浮动目录。

## 二级标题

### 三级标题
```

### 方式二：Decap CMS 后台

1. 将项目部署到 Vercel / Netlify
2. 修改 `public/admin/config.yml` 中的 `repo` 为你的 GitHub 仓库地址
3. 访问 `你的域名/admin` 进入后台
4. 用 GitHub 账号登录后即可可视化管理所有内容

---

## 部署

### Vercel（推荐）

1. 将代码推送到 GitHub
2. 在 [vercel.com](https://vercel.com) 导入项目
3. 框架自动识别为 Astro，直接部署即可
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
│   │   ├── index.html
│   │   └── config.yml
│   ├── images/             所有图片资源
│   │   ├── hero/           首页背景图
│   │   ├── mascot/         吉祥物
│   │   ├── music-art/      曲绘
│   │   └── blog/           博客插图
│   └── favicon.svg
├── src/
│   ├── config.ts           ★ 站点全局配置
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── components/
│   │   └── Navbar.astro
│   ├── pages/
│   │   ├── index.astro     首页
│   │   ├── poetry.astro    诗歌
│   │   ├── music.astro     音乐
│   │   ├── blog.astro      博客
│   │   ├── notes.astro     笔记
│   │   └── about.astro     关于
│   ├── content/            ★ 所有内容（Markdown）
│   │   ├── config.ts       内容 Schema 定义
│   │   ├── poems/
│   │   ├── songs/
│   │   ├── blogs/
│   │   └── notes/
│   ├── data/               CMS 管理的 JSON 数据
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── README.md
```

---

## 页面功能一览

| 页面 | 功能 |
|------|------|
| **首页** | 全屏背景图 + 打字机文字轮播 + 吉祥物 |
| **诗歌** | 左栏列表 + 诗集筛选 + 右栏阅读 + 可拖动「创作背记」弹窗 |
| **音乐** | 左栏列表 + 专辑筛选 + 平台外链 + 歌词展示 + 可拖动「创作手记」弹窗 |
| **博客** | 左栏列表 + Markdown 正文 + 行内内容关联（点击弹出可拖动浮层） |
| **笔记** | 左栏列表 + 分类筛选 + 浮动目录面板（自动从标题生成，可拖动） |
| **关于** | 居中单栏信件排版 + 社交平台外链 |

全局搜索框支持搜索标题、诗集名、专辑名、分类名。  
在搜索框输入 `/admin` 可跳转后台管理。

---

## 自定义主题色

编辑 `src/styles/global.css` 中的 CSS 变量：

```css
:root {
  --color-accent: #1e3a5f;       /* 主色（深蓝） */
  --color-accent-light: #2c5282;  /* 主色浅 */
}
```

建议从首页背景图中取色来保持整体协调。
