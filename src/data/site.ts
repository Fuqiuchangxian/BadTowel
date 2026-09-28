// ─────────────────────────────────────────────────────────────
//  全站内容都在这里。改文案 / 加链接 / 加项目，只需要改这个文件。
//  链接留空字符串 '' 时，对应按钮会显示为「即将更新」。
// ─────────────────────────────────────────────────────────────

export const profile = {
  nameZh: '马均昊',
  nameEn: 'MA JUNHAO',
  lab: 'JUNHAO / LAB',
  manifesto: ['在 AI 时代，', '持续构建产品、研究传播，', '也保留一点古法手搓。'],
  focus: '关注营销、关注广告、关注产品、关注 AI。',
  tags: ['AI Product', 'Marketing', 'Research', 'Creation'],
  description: '马均昊的个人网站。在 AI 时代，持续构建产品、研究传播，也保留一点古法手搓。',
};

export const contacts: { label: string; href: string }[] = [
  { label: 'Email', href: 'mailto:ma.junhao@outlook.com' },
  { label: 'GitHub', href: 'https://github.com/Fuqiuchangxian/BadTowel' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/junhao-ma-b97552369' },
  { label: 'Resume', href: '/resume.pdf' },
];

export const about = {
  greeting: '你好，我是马均昊。',
  body: [
    '你可以在这里看到相对丰富的我：',
    '我做过的工作、参与过的项目、正在思考的问题，以及一些工作之外的东西。',
  ],
  pillars: [
    { k: '构建产品', v: 'AI Agent、素材中台、Skill 治理——把复杂业务流程变成真正可用的系统。' },
    { k: '研究传播', v: '广告、消费者行为、脑电与内容效果——理解内容如何影响人。' },
    { k: '古法手搓', v: '设计、写歌、做视频——保留一个给情绪与创作欲的出口。' },
  ],
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  companyIntro?: string;
  summary: string;
  bullets: { title: string; text: string }[];
  note?: string;
  caseStudy?: { href: string; label: string };
};

export const experience: Experience[] = [
  {
    company: '蓝色光标',
    role: 'AI 产品实习生（数字员工落地与运营）',
    period: '2026.08 — 2026.09',
    summary:
      '数据平台组为面向全公司业务组的技术中台，我负责了汽车事业群脚本承接达人投放场景的审核 Agent 的架构设计、能力建设与落地。',
    bullets: [
      {
        title: '架构设计与落地',
        text: '梳理业务流程并规范审核逻辑，将确定性步骤规则化、判断推理环节交由模型处理；基于 OpenClaw 设计「主 Agent 解析文档、子 Agent 分系列审核」的层级架构，通过工具裁剪、边界约束与 Prompt 精简降低上下文占用与执行发散；建立新系列标准化接入流程，支持审核能力向全汽车事业群复用，并规划后续向 A2A 协作模式演进。',
      },
      {
        title: '自进化知识库搭建',
        text: '参考 LLM-Wiki 思路设计并落地审核知识库，将审核规则、品牌与产品规范由 Agent 自行维护，建立业务反馈闭环，支持规则迭代与新客户快速接入。',
      },
      {
        title: '落地迭代与问题攻坚',
        text: '持续迭代审核规则与产品能力（扩展支持的文件格式等），针对 Agent Loop 长会话下上下文膨胀导致的执行稳定性问题进行优化，推动 Agent 架构从设计方案落地至实际可用。',
      },
      {
        title: 'Skill 治理体系搭建',
        text: '统一集团内部 Skill 鉴权方式，主导鉴权改造与运营看板汇报机制建设，实现 Skill 运行结果可监控、可归因，建立后续 Skill 统一治理基础。',
      },
    ],
    note: '我们是 BlueAI 数据中台组的产品同学。蓝标本来以提供服务盈利，现在会做面向内部的 AI 提效，以及基于沉淀下来的能力对客户做 Agent 交付。我们主要做从需求拆解到基于内部 Flare 平台搭建、调优、落地 Agent 与 Skill 的工作，所以这段实习也让我补充了一些技术视角的能力和思考。',
    caseStudy: { href: '/work/review-agent', label: '阅读案例：脚本审核 Agent' },
  },
  {
    company: '百度',
    role: '产品经理实习生（广告中台 & 智能体）',
    period: '2026.01 — 2026.06',
    summary:
      '素材中台服务内部策略团队与外部代理商，承接百度自有产品效果投放「素材生产供给—资产治理—多渠道分发投放」全链路能力。我主要负责 AI 能力建设与媒体投放接入，推动素材能力从平台化向智能化演进。',
    bullets: [
      {
        title: 'AI Agent 产品化',
        text: '围绕广告素材「生产—管理—分析—分发—投放」全链路，规划建设 AI 智能搜索、AI 智能分析、AI 智能分发能力，在网赚、搜索、短剧三个场景落地，打通「分析找方向—派单出素材」闭环；初期上线后月均分析派单素材约 2.3 万条，占素材生产量 15%。',
      },
      {
        title: 'MAPI 接入与投放能力补强',
        text: '完成华为、小米、快手等头部媒体 MAPI 对接升级，覆盖创编字段优化、广告版位扩展、API 版本迭代及原生广告能力落地；夯实平台投放底层基建，提升内部媒体能力落地覆盖率，将产品迭代周期缩短 30%。',
      },
      {
        title: '中台标签体系治理',
        text: '基于业务优化需求与平台长期规划，结合素材管理与代理商管理场景重新设计平台分产品线与素材场景标签方案，提升素材生产、上传、管理、投放及数据回收链路稳定性，为 AI 检索与效果分析提供结构化数据基础。',
      },
      {
        title: '素材智能体产出效果优化',
        text: '通过 Prompt 工程优化前贴场景 AIGC 素材生产流程，并沉淀为 Skill，实现热点洞察、创意探索与素材优化的自动化。',
      },
    ],
  },
  {
    company: 'SocialBeta',
    role: '内容运营实习生',
    period: '2025.06 — 2025.12',
    companyIntro:
      'SocialBeta 是国内专注品牌营销与数字营销的内容平台，长期追踪品牌案例、行业趋势与营销人动态，是许多品牌方、代理商与营销从业者日常获取灵感和行业信息的来源。',
    summary:
      '追踪行业动态、拆解优秀营销案例，主导视频内容策划与产出，实现视频号点赞环比增长 150%，积累营销内容洞察与行业分析能力。',
    bullets: [
      {
        title: '行业动态追踪',
        text: '持续关注品牌营销、广告创意与平台生态的新变化，筛选有价值的行业信息与趋势信号，输出到平台内容中。',
      },
      {
        title: '营销案例拆解',
        text: '拆解优秀品牌营销案例，从洞察、创意、渠道到执行，提炼可复用的方法与判断，训练自己「看懂一个好案例」的能力。',
      },
      {
        title: '视频内容策划与产出',
        text: '主导视频号内容的选题、策划与制作，把行业内容转化为更适合短视频传播的表达，实现视频号点赞环比增长 150%。',
      },
    ],
  },
];

export const projects = [
  {
    tag: 'Research · Paper',
    title: 'IAMCR 论文（三作）',
    text: '研究受众对情感视觉内容的信息加工机制，探索脑电数据在广告素材效果评估中的应用。负责对脑电数据的分析清洗工作，产出实证结论。',
  },
  {
    tag: 'Award · 省一等奖',
    title: '正大杯市场调研大赛',
    text: '主导华北地区瑕疵果电商消费行为研究，基于 565 份问卷与 533 条电商评论数据，综合运用 SEM、多分类 Logistic 回归、K-Means 聚类、NLP 文本挖掘及深访等方法，构建消费者购买意愿驱动模型，提出 PRISM 运营策略框架。',
  },
  {
    tag: 'Research',
    title: '跨太平洋 AI 议题传播研究',
    text: '参与跨太平洋语境下 AI 议题传播的相关研究。',
  },
  {
    tag: 'Coming soon',
    title: '其他项目',
    text: '待补充中……',
    muted: true,
  },
];

export const thinking = {
  lead: '我对一些事情保持长期的好奇。',
  aside: '（尽管经常三分钟热度，但积攒起来的三分钟也不算少。）',
  blog: {
    text: '工作之外，写一些关于生活、情绪和当下的文字。',
    href: '/blog/',
  },
  wiki: {
    text: '由于更希望能够在 AI 时代保留有自己的决策力，我并没有采用完全由 AI 维护的知识库。你可以在这里看到我的一些积累：',
    label: '我的知识库',
    href: 'https://my.feishu.cn/wiki/PIB2wK1pRiDzHDk0yA6cf7ovnzd',
  },
};

export type Work = {
  kind: string;
  title: string;
  text: string;
  href: string;
  cover?: string; // 可选：放到 public/works/ 下，例如 '/works/kaizhang.jpg'
  featured?: boolean;
};

export const experiments = {
  intro: '这里存放一些我所做过相对不错的其他东西。',
  works: [
    {
      kind: 'AI Coding · 个人产品',
      title: '开张 KAIZHANG',
      text: '帮一个零基础的人，从学会到做出、再到被人看到自己的第一个 AI 产品。',
      href: 'https://my.feishu.cn/wiki/W24cw38X8iaatJknmi3ccVc5nqg',
      featured: true,
    },
    {
      kind: 'Presentation Design · 手搓',
      title: '互联网媒体研究：哔哩哔哩投资报告',
      text: '完全由我个人手搓，配图由 AI 生成。我也把设计思路沉淀为了个人 Skill，在之后的工作中带来了很大的帮助和提效。',
      href: 'https://khsj.cn/28eg26v8p58yxqb',
    },
    {
      kind: 'Research · 答辩',
      title: '瑕疵果电商消费行为研究',
      text: '市场调研大赛答辩 PPT，做了相对深入的量化与质化研究。',
      href: 'https://khsj.cn/errdxcvgymbc98a',
    },
    {
      kind: 'Consumer Research',
      title: '年轻人现制饮品消费动机与偏好差异研究',
      text: '以喜茶、茉莉奶白、瑞幸为例。',
      href: 'https://my.feishu.cn/wiki/GWYlw6X5DiwFfvk3ePWcaOwYnDe',
    },
    {
      kind: 'Computational Visual Design',
      title: '计算视觉设计作业',
      text: '计算视觉设计方面的相关作业。',
      href: 'https://khsj.cn/r1l8cvkrgb6luos',
    },
    {
      kind: 'Poster',
      title: '个人首张专辑宣传海报',
      text: '为我的第一张专辑设计的宣传海报。',
      href: 'https://khsj.cn/ux7an14cwwps5b2',
    },
    {
      kind: 'Presentation Design',
      title: '品牌传播与广告主 · 开题报告',
      text: '又一 PPT 大作。我很满意这个 PPT 的视觉设计部分。',
      href: 'https://khsj.cn/7c3udx0qbrq3nm8',
    },
  ] as Work[],
  music: {
    title: '我还会写歌',
    text: '在 B 站发布，也获得了相当一部分暖心的评论。',
    videos: ['BV15VnUzhEyM', 'BV1tamHBoETt', 'BV1tkcyzxEYg'],
  },
};

export const manifesto = [
  '在 AI 时代，保留一点古法手搓。',
  '保留一个给我自己的情绪以及创作欲的出口。',
  '拥抱 AI，但别忘了，拥抱自己。',
];

// 06 ABOUT ME 做成了一台「小电脑」：每个喜欢的东西是一个 App。
// 文案 v 是原文；music / bookGenres / work / feed 是各个 App 里互动用的素材。
export const me = {
  intro: '这是一台装着我的小电脑。点点侧栏、Dock 和红绿灯，都能玩。',
  likes: [
    { id: 'music', k: '听音乐', v: '蔡依林、Lady Gaga、苏打绿、chilichill、洛天依……' },
    { id: 'books', k: '看书', v: '虽然三分钟热度，但积累起来也不算少。社会学、散文、诗歌等。' },
    {
      id: 'work',
      k: '工作',
      v: '我是一个很需要成就感来证明自己的人，我需要认同、需要反馈。身处自己热爱的行业，我很喜欢当下和之前的工作。',
    },
    {
      id: 'feed',
      k: '刷资讯',
      v: '我一直认为沉浸于信息流是我的一大缺点。但我发现自己有一个近乎天赋的能力：能从中获取一些思想或方法，从各种资讯中拿到未来可能会有用的片段。（嗯，就和广告推荐一样，predict 一个未来可能会用到的 chunk。）',
    },
  ],
  music: ['蔡依林', 'Lady Gaga', '苏打绿', 'chilichill', '洛天依'],
  bookGenres: ['社会学', '散文', '诗歌', '社会学', '散文', '诗歌', '其他'],
  work: [
    { from: '脚本审核 Agent', text: '新车系接入完成，审核规则跑通了。' },
    { from: '素材中台', text: 'AI 智能分析在新场景上线了。' },
    { from: 'Skill 看板', text: '这周的 Skill 运行结果都能归因了。' },
    { from: '视频号', text: '新视频收到了很多点赞和评论。' },
    { from: 'B 站', text: '有人在你的歌下面留了一条很暖的评论。' },
    { from: '同事', text: '「这个方案想得很清楚。」' },
  ],
  feed: [
    ['AI', '又一个 Agent 框架开源了，主打多 Agent 协作'],
    ['广告', '品牌开始用 AIGC 批量生产投放素材'],
    ['营销', '年轻人为什么愿意为情绪价值买单'],
    ['产品', '一份好的需求文档应该写多长？'],
    ['AI', 'MCP 生态里又多了一批新工具'],
    ['传播', '内容平台的推荐逻辑正在悄悄改变'],
    ['音乐', '有人用 AI 做完了一整张专辑'],
    ['设计', '做 PPT 的人也开始写 Skill 了'],
    ['研究', '脑电数据能不能预测一条广告的效果'],
    ['产品', 'To B 产品怎么做冷启动'],
    ['营销', '一个品牌联名是怎么从 brief 走到刷屏的'],
    ['AI', '长上下文不等于好上下文'],
  ] as [string, string][],
  doing: ['写歌、创作、做视频', '做一些自己的小项目', '学一些莫名其妙但感兴趣的东西'],
};

export const privacyNote =
  '以上公开链接之外，如果你碰巧得知了我的其他平台账号或未公开的信息，希望不要传播分享它们。';

export const nav = [
  { href: '/#about', label: 'About' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#thinking', label: 'Thinking' },
  { href: '/#experiments', label: 'Experiments' },
  { href: '/#me', label: 'Me' },
];
