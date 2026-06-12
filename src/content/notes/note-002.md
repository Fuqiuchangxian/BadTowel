---
title: "Data Science: Machine Learning and Natural Language Processing"
date: "2026-04-07"
categories:
  - "数据科学"
  - "机器学习"
  - "自然语言处理"
  - "Python"
public: true
lockReason: ""
starred: false
---

# 教学大纲

> 这个不重要主要是提醒我啥时候考试啥时候交作业，但也可以当作是一个 learning map

| Lecture | HW | Topic(s) |
|---|---|---|
| **1** | | Course Introduction, Syntax, Variables, Operators, Regex, Datetime, Escape Characters, Functions（课程介绍、语法、变量、运算符、正则表达式、日期时间、转义字符、函数） |
| **2** | | Sets, Dictionary, Lists, For, While, Do, I/O Read/Write（集合、字典、列表、For循环、While循环、Do循环、I/O读写） |
| **3** | HW1 | Data Wrangling, Cleaning Data, Automation mind-set of modularity（数据整理、数据清洗、模块化的自动化思维） |
| **4** | HW2 | Natural Language Processing: Text Tokenization, Stemming, Feature Matrix Manipulation. Topical Extraction: Naïve Approach（自然语言处理：文本分词、词干提取、特征矩阵操作。主题提取：朴素方法） |
| **5** | | Feature Selection: TF, TF-IDF, Feature Vector, N-gram methods. Data Summary: DataFrame Manipulation. Advanced Topical Extraction: LDA（特征选择：TF、TF-IDF、特征向量、N-gram方法。数据摘要：DataFrame操作。高级主题提取：LDA） |
| **6** | | Feature Selection: Chi-Squared. Dimension Reduction: PCA. Advanced Transformers: Embeddings and LLMs（特征选择：卡方检验。降维：PCA。高级Transformers：嵌入和大语言模型） |
| **7** | | Supervised Learning Algorithms: Random Forest, Naïve Bayes, SVM. Unsupervised Learning Classification: Clustering techniques. Prediction: Techniques and Model Metric (confusion matrix) comparison（监督学习算法：随机森林、朴素贝叶斯、支持向量机。无监督学习分类：聚类技术。预测：技术和模型指标(混淆矩阵)比较） |
| **8** | HW3 | Time Series Prediction: CNNs, Neural networks (RNNs, LSTMs, Transformers) for sequence modeling（时间序列预测：用于序列建模的CNN、神经网络(RNN、LSTM、Transformers)） |
| **9** | HW4 | Reinforcement learning for sequential decision making. Time Series: Random forests and gradient boosting for temporal data（用于序贯决策的强化学习。时间序列：用于时序数据的随机森林和梯度提升） |
| **10** | | State space models with learnable components: neural Kalman filters and Variational Autoencoder for time series（具有可学习组件的状态空间模型：神经卡尔曼滤波器和用于时间序列的变分自编码器） |

---

# 宏观理论与方法论

> The "Why" & "How"

## 1. 什么是数据科学？

> 很喜欢扔一些定义在这里，都是怎么想的啊这么完美的定义。

**Per WIKI（根据维基百科）：**

> "Data science is an **interdisciplinary** field that uses scientific methods, processes, algorithms (/ˈæl.ɡə.rɪ.ðəm/) and systems to **extract** knowledge and insights from structured and unstructured data, and apply knowledge and actionable insights from data across a broad range of application domains."
>
> 译："数据科学是一个跨学科领域，它使用科学方法、流程、算法和系统从结构化和非结构化数据中提取知识和见解，并在广泛的应用领域中应用从数据中获得知识和可行的见解。"

**参考文献：**

- \[1\] Dhar, V. (2013). "Data science and prediction"...
- \[2\] Jeff Leek (12 December 2013). "**The key word in "Data Science" is not Data, it is Science**"...

数据科学是什么巴拉巴拉第四科学范式。（前三种是啥我查一下——实验、理论、计算）在我看来其实就是从数据里面找一些东西解决问题。（所以我还是要说一切的根源是问题啊！！）

## 2. 数据科学流程

> 这个流程整理的很全面啊我觉得很清晰

| 阶段 | 步骤 | 中文 | 备注 |
|---|---|---|---|
| **DISCOVERY 发现** | Understand needs / requirements / pain points | 理解需求/要求/痛点 | 要从问题出发啊！ |
| **DEFINE 定义** | Product Description / Usage / Expectation / Internal & External use / Value | 产品描述/用途/期望/用例/价值 | 对问题要深挖一步，**慢思考，重定义**，挖掘到问题背后真正的问题。 |
| **DATA 数据** | Data Required | 所需数据 | 第一二三方的数据（party） |
| | Aggregate Data | 聚合数据 | 数据清洗和整理 wrangling，这一步真的很痛苦了。。。 |
| | Analyze Data | 分析数据 | 总结&可视化。这一步还好，就是要根据后面选择的模型来选择对应的可视化指标（线性模型热力图也要线性） |
| | Prepare Data | 准备数据 | 转换&特征选择（特征工程！具体怎么做我应该会扔个单独的文档） |
| **MODELING 建模** | Train | 训练 | 根据实际问题进行模型选择 |
| | Validation | 验证 | Parametric Grid Search / Model Tuning（参数网格搜索/模型调优）。但是手动调很麻烦，可以试一下贝叶斯优化。要是特征量大的话挂个云GPU呗 |
| | Test | 测试 | Performance Measures：性能度量。这一步就看你是回归问题还是分类问题，不同问题有不同的标准咯。 |
| | Monitor | 监控 | Recalibration 重新校准。可以根据实际情况再去选择模型。！！！这一步可以去试一下 **SHAP**，基于博弈论的模型解释模型。在这之后可以重新做一些特征工程 |

## 3. 数据科学技能集 Skill-Set

> 这个主要作用是一个知识图谱 缺啥补啥吧
> 卧槽这个真的很有用整理完以后我感觉我的大脑变得很智慧！

### 数学

**Statistics（统计学）**
- Distributions, sampling techniques, mean, standard deviation, normalization（分布、抽样技术、均值、标准差、归一化）
  - Normal Distribution（正态分布）, Student's t Distribution（学生t分布）, Chi-Square Distribution（卡方分布）, F Distribution（F分布）
- Descriptive — visualizations of data（描述性统计 - 数据的可视化）
- Inferential — make predictions using the data（推断性统计 - 使用数据进行预测）

**Linear Algebra（线性代数）**
- Backbone of many algorithms（许多算法的支柱）

**Probability（概率论）**
- Bayes Theorem（贝叶斯定理）
- Central Limit Theorem（中心极限定理）：对于一个均值为μ、标准差为σ的总体，如果从中进行容量足够大的有放回随机抽样，那么样本均值的分布将服从正态分布。
- Law of Large Numbers（大数定律）

**Multivariate Calculus（多元微积分）**
- Theorems, gradient, derivatives, limits, product and chain rules, Taylor series（定理、梯度、导数、极限、乘法和链式法则、泰勒级数）

### 编程

| 语言 | 备注 |
|---|---|
| **Python** | 数据科学家的首选语言，约70%的数据科学家使用Python |
| **R** | 我觉得这个不好用但是画出来的图好看。感觉R会在统计领域更加细分一点而且学术上用的可能多一些，那个ggplot啊之类的库蛮好用。但是已经会Python了R就不太想学了。要画图的话找些样例代码交给AI生成个R语言代码也是够用的。 |
| **SAS** | 没听说过的语言。SAS (Statistical Analysis System) 是一种集数据管理、分析、报告于一体的商业软件套件。它以**稳定、可靠、权威**著称，在金融、医药、政府等传统和高监管行业中仍然占据着重要地位。 |
| **C++, JAVA** | 这个我也不会。不去干ML底层工作的话应该不需要这个。 |

### 大数据

| 工具 | 说明 | 备注 |
|---|---|---|
| **Hadoop** | File structure for distributed computing（用于分布式计算的文件结构） | 将一个大文件切分成很多个小的数据块(Blocks)，然后将这些数据块分散存储在集群的不同计算机上，并保存多个副本以保证数据安全。 |
| **SQL** | Structured Query Language（结构化查询语言） | MySQL, PostgreSQL, Oracle, SQL Server 这一类。 |
| **NoSQL** | Non-Structured Query Language（非结构化查询语言） | 一类**非关系型数据库**的总称。它们被设计用来解决传统SQL数据库在处理超大规模、数据结构多变场景下的不足。通常分布式。 |
| **PySpark** | Python for Distributed Computing（用于分布式计算的Python） | Spark 是一个通用、快速的分布式计算引擎。PySpark 是 Spark 为 Python 语言提供的API |

### 机器学习

| 类型 | 任务 | 备注 |
|---|---|---|
| **Supervised Learning（监督学习）** | Regression（回归）/ Classification（分类） | 从有标签的数据里面学习规律然后构建模型用于分类或者回归。 |
| **Unsupervised Learning（无监督学习）** | Clustering（聚类）/ Association（关联分析） | **Clustering**就是把相似的数据点分到同一个组里。**Association**就是发现不同项目之间同时出现的规律，比如购物篮分析。 |
| **Semi-supervised Learning（半监督学习）** | Classification / Clustering | 利用大量无标签数据来辅助少量有标签数据的学习，以达到更好的效果。用于文本分类、GPS数据中的车道寻找。 |
| **Reinforcement Learning（强化学习）** | Classification / Control | 可以用于对不同用户推送最可能让他点击的广告；无人驾驶汽车在复杂的路况下，学习如何转动方向盘、踩刹车/油门以安全到达目的地。 |

## 参考文献

> 这个我感觉我不会去看但是放一下 万一需要呢。

- https://web.stanford.edu/~jurafsky/
- Natural Language Processing with Python (https://www.nltk.org/book/)

---

# 自然语言处理 (NLP) 相关

## 1. 什么是自然语言处理 NLP？

提到NLP，最出名的就是50年代提出的图灵测试。

干这么两件事：

**Interaction between computers and human (natural) languages（计算机与人类自然语言之间的交互）**，主要以下两个方面：

- **Understanding** — Process meaning of spoken/typed words（理解 - 处理你说的话的含义）
- **Generation** — Expression into natural (human) language（生成自然语言）

**Processing of vast amounts of natural language data (text)（处理海量的自然语言文本数据）**

## 2. NLP 的应用

| 应用 | 描述 | 备注 |
|---|---|---|
| **Language Modeling（语言建模）** | 根据前面的词预测下一个词。 | 大语言模型LLM就用的这个啊！还有输入法补全之类的 |
| **Speech Recognition（语音识别）** | 将声音信号映射到自然语言 | 这个就是语音识别没啥好说的 |
| **Word Associations（词语关联）** | 确定一个词或短语的同义词和相关词 | 找出词语之间的**语义关系**。搜索引擎优化会用，还有推荐系统和问答类的专家系统或许也会？ |
| **Sentiment Analysis（情感分析）** | 确定作者或整个社会的情感基调或情绪 | 就是爬取评论之类的东西做一些监控啊预测啊调查啊分析啊之类的活 |
| **Text Classification（文本分类）** | 预测文本的类别关联 | 分辨垃圾邮件、新闻类别、客服工单类别之类的。现在大模型更精准更人性化一点 |
| **Topical Extraction（主题提取）** | 确定一段文本的主要主题 | 也叫主题建模 (Topic Modeling)。从大量文档中自动发现隐藏的主要主题或话题。这个更类似于是在做聚类。分析用户画像、文档库管理、开放式问卷的分析等。 |

## 3. NLP 基础与文本预处理

### 3.1 文本分词 (Text Tokenization)

将连续的文本流切分成有意义的单元（通常是单词或子词），这是所有NLP任务的第一步。

- **英文实现：** 可以使用简单的字符串方法 `.split()`，但更推荐使用 `nltk.tokenize.word_tokenize()`，因为它能更智能地处理标点符号。
- **中文实现：** 由于中文没有天然的空格分隔符，必须使用专门的分词工具，如 `jieba` 库。

### 3.2 词干提取 (Stemming) 与词形还原 (Lemmatization)

**目标：** 将单词的不同变体（如复数、时态变化）统一为其基本形式，以减少词汇量并聚合语义。

**PS (PorterStemmer) - 词干提取：**
- **原理：** 一种基于规则的、比较"粗暴"的方法，通过直接砍掉单词的后缀来提取词干。
- **示例：** fishes -> fish, studying -> studi
- **特点：** 速度快，但结果可能不是一个合法的单词。

**L (Lemmatization) - 词形还原：**
- **原理：** 一种基于词典的、更"智能"的方法，将单词还原为其在字典中的基本形式（词元）。通常会用到词性 (PoS) 信息来提高准确性。
- **示例：** ran -> run, better -> good
- **特点：** 结果准确，语义上更优，但速度稍慢。

> 在**情感分析**任务中，有时不进行词干提取效果更好。

### 3.3 文本清洗与辅助工具

- **停用词移除 (Stop Words Removal)：** 移除 "the", "a", "is" 等常见但对分析意义不大的词。
- **collections.Counter()：** Python内置的高效计数工具。在 `word_freq` 函数中使用它来快速、准确地进行词频统计，是构建词袋模型和TF-IDF的基础。

## 4. 文本特征工程与主题建模

### 4.1 文本相似度度量

**Jaccard 相似度：**
- **定义：** 一种基于集合运算的相似度度量方法。
- **公式：** Jaccard Similarity = (两个集合的交集大小) / (两个集合的并集大小)
- **实现步骤：** 将两个句子分别分词并转换为集合，然后利用集合的 `.intersection()` 和 `.union()` 方法计算即可。

**余弦相似度 (Cosine Similarity)：**

NLP中衡量文本（已经被表示为向量）相似度的核心数学工具。

- **定义：** 一种通过计算两个**向量**之间夹角的**余弦值**来衡量它们相似性的方法。
- **计算方法：** 它是两个向量的**点积 (dot product)** 除以它们各自的**欧几里得范数 (euclidean norms) 或模长 (magnitude)** 的乘积。
- **相似度只与方向有关，与向量的长度无关。**
  - **Similar（相似）：** 两个向量方向非常接近，夹角 θ 很小。cos(θ) 趋近于 **1**。
  - **Unrelated（不相关）：** 两个向量方向接近垂直（正交），夹角 θ 接近90度。cos(θ) 趋近于 **0**。
  - **Opposite（相反）：** 两个向量方向完全相反，夹角 θ 接近180度。cos(θ) 趋近于 **-1**。

### 4.2 文本表示方法（文本向量化）

将预处理后的文本转换成机器学习模型可以处理的数字向量。

**4.2.1 词袋模型 (Bag-of-Words)：**

- **CountVectorizer（词频向量化）：** 最基础的方法，**统计每个词在文档中出现的次数（词频），并以此形成一个向量**。它只关心词是否出现以及出现了多少次，不关心词的顺序。

**4.2.2 词权重模型 (Term Weighting Models)：**

- **TF-IDF（词频-逆文档频率）：** 一种更高级的词权重计算方法。
  - **TF (Term Frequency)：** 一个词在当前文档中出现得越多，它越重要。
  - **IDF (Inverse Document Frequency)：** 一个词在**所有**文档中出现的频率越低（越稀有），它的权重就越高。
  - 综合考虑词在本文档中的频率（TF）和它在整个语料库中的稀有程度（IDF），从而更好地衡量一个词的重要性。

**4.2.3 N-gram 模型：**

`ngram_range=(m, n)` 这是一个非常重要的参数。

- `ngram_range=(1, 1)`（默认）: 只考虑单个词 (unigrams)，如 "machine", "learning"。
- `ngram_range=(1, 2)`: 同时考虑单个词和相邻的两个词 (bigrams)，如 "machine", "learning", "machine learning"。
- **作用：** N-gram 能够捕捉到一些单个词无法表达的短语信息，有助于提升模型效果。

### 4.3 特征降维 (Dimensionality Reduction)

**PCA (主成分分析)：**
- **问题：** 文本向量化后，特征维度通常非常高（成千上万维），这会导致计算量巨大且可能存在噪音（"维度灾难"）。
- **解决方案：** PCA是一种常用的线性降维技术，它可以在保留大部分信息（方差）的同时，将高维向量映射到低维空间，去除噪音，减少向量的维度，便于计算和可视化。

### 4.4 主题提取 (Topical Extraction)

- **目标：** 从语料库 (corpus) 中确定**主题/话题 (topics/themes)**。
- **方法：** 一种**无监督机器学习**技术，用于将文档自动地划分到特定的主题中。
- **核心算法：** **Latent Dirichlet Allocation (LDA)** 是实现这一目标的主要算法之一。

## 5. 贝叶斯定理 (Bayes Theorem)

### 5.1 核心公式

```
P(A|B) = P(B|A) * P(A) / P(B)
```

- **P(A|B)：后验概率 (Posterior)** - 在事件B发生的条件下，事件A发生的概率。这是我们**想要求**的。
- **P(B|A)：似然 (Likelihood)** - 在事件A发生的条件下，事件B发生的概率。
- **P(A)：先验概率 (Prior)** - 事件A本身发生的概率。
- **P(B)：证据 (Evidence)** - 事件B本身发生的概率。

**核心假设：** 预测因子（特征）之间相互**独立 (independent)**。（这是"朴素"贝叶斯的"朴素"之处）

### 5.2 直观示例（天气预测）

**已知信息（过去100天）：**
- 阴天的概率 P(cloudy) = 40/100 = 0.4
- 下雨的概率 P(rainy) = 30/100 = 0.3
- 在下雨天中，同时也是阴天的概率 P(cloudy | rainy) = 25/30 = 0.625

**求解目标：** P(rainy | cloudy) - 已知今天**是阴天**，那么**会下雨**的概率是多少？

**套用公式求解：**
P(rainy|cloudy) = [P(cloudy|rainy) * P(rainy)] / P(cloudy) = (0.625 * 0.3) / 0.4 = **0.833**

### 5.3 在文本分类中的应用（朴素贝叶斯）

- **任务：** 根据文本内容，判断其标签是 "Sports" 还是 "Not Sports"。
- **核心思想：** 我们要求的是 P(Sports | "a great game")，即看到句子 "a great game" 时，它属于体育类的概率。根据贝叶斯定理，这可以转换成：P("a great game" | Sports) * P(Sports) / P("a great game")
- **"朴素"假设：** 句子中的每个词（"a", "great", "game"）都是**相互独立**的。因此 P("a great game" | Sports) 可以被拆解为 P(a|Sports) * P(great|Sports) * P(game|Sports)。

### 5.4 拉普拉斯平滑 (Laplacian Smoothing)

在计算概率时，分子和分母都加了一个数（这里是+1和+总独立词数）。这是为了**防止概率为零**。如果一个词在训练集中从未出现在某个类别里，它的概率就是0，这会导致整个句子的概率乘积都变成0，这是不合理的。平滑操作保证了即使是未见过的词，也有一个很小的概率。

## 6. 潜在狄利克雷分配 (LDA)

### 6.1 What is LDA?

LDA是一个用于处理离散数据（如文本）集合的**生成式概率模型 (generative probabilistic model)**。

它是一个三层的**层级贝叶斯模型 (hierarchical Bayesian model)**。

**核心思想：** 它假设每篇**文档 (document)** 是由一个或多个**潜在主题 (latent topics)** 以一定的概率混合而成。而每个**主题**又是所有**词语 (word)** 以一定的概率混合而成。我们观察到的只是词语，主题是"潜在"的，需要模型去推断。

### 6.2 用途与核心概率

训练好的模型可以用来估算**文档之间的相似度**以及**特定关键词之间的相似度**。

LDA 的一个优点是它可以对**从未见过的文档**进行主题推断。

**核心概率：**
- **p(topic t | document d)（文档-主题分布）：** 表示文档 d 属于主题 t 的概率，告诉我们**一篇文档包含了哪些主题**。
- **p(word w | topic t)（主题-词语分布）：** 表示在主题 t 下，出现词语 w 的概率，告诉我们**一个主题由哪些关键词定义**。

### 6.3 指标

- **主题连贯性：** 通过衡量主题中高分词之间的语义相似度来为单个主题评分
  - C_v：基于滑动窗口、主题 top 词的单段分割，以及使用归一化点互信息（NPMI）和余弦相似度的间接确认度量
  - C_p：基于滑动窗口、主题 top 词的前一个分割，以及 Fitelson 连贯性的确认度量
  - C_uci：基于滑动窗口和给定 top 词的所有词对的点互信息（PMI）
  - C_umass：基于文档共现计数、前一个分割，以及对数条件概率作为确认度量
  - C_npmi：是 C_uci 连贯性的增强版本，使用归一化点互信息（NPMI）
  - C_a：基于上下文窗口、top 词的成对比较，以及使用归一化点互信息（NPMI）和余弦相似度的间接确认度量
- **困惑度得分：** 衡量模型的优劣，得分越低越好
- Gensim API：https://radimrehurek.com/gensim/models/ldamodel.html

---

# 机器学习 (ML) 相关

## 1. 机器学习分类

| 类型 | 任务 | 备注 |
|---|---|---|
| **Supervised Learning（监督学习）** | Regression（回归）/ Classification（分类） | 从有标签的数据里面学习规律然后构建模型用于分类或者回归。 |
| **Unsupervised Learning（无监督学习）** | Clustering（聚类）/ Association（关联分析） | **Clustering**就是把相似的数据点分到同一个组里。**Association**就是发现不同项目之间同时出现的规律，比如购物篮分析发现"买啤酒的人通常也会买尿布"之类。 |
| **Semi-supervised Learning（半监督学习）** | Classification / Clustering | 利用大量无标签数据来辅助少量有标签数据的学习，以达到更好的效果。用于文本分类、GPS数据中的车道寻找。 |
| **Reinforcement Learning（强化学习）** | Classification / Control | 可以用于对不同用户推送最可能让他点击的广告；无人驾驶汽车在复杂路况下，学习如何转动方向盘、踩刹车/油门以安全到达目的地。 |

## 2. 一个机器学习工作流

- **数据加载与预处理：** 调用 `file_crawler`, `rem_sw`, `stem_fun` 等函数，将原始文本数据清洗干净，得到可供建模的文本。
- **特征工程（向量化）：** 调用 `vec_fun` 将文本转换成 TF-IDF 数字向量矩阵。这是**将文本语言"翻译"成机器语言**的关键一步。
- **模型训练：** 调用 `clust_fun`，使用上一步得到的向量矩阵来训练一个 K-Means 聚类模型。
- **模型持久化：** 在 `vec_fun` 和 `clust_fun` 内部，通过调用 `write_pickle`，将训练好的**向量化器 (Vectorizer)** 和**聚类模型 (Cluster Model)** 保存到硬盘。
- **结果评估：** 调用 `cluster_stats` 对聚类结果进行初步的分析和解读。

## 3. 监督学习 (Supervised Learning)

### 3.1 核心算法

- 随机森林 (Random Forest)
- 朴素贝叶斯 (Naïve Bayes)
- 支持向量机 (SVM)

### 3.2 模型评估与预测

- 预测技术与模型指标 (Prediction Techniques & Model Metrics)
- 混淆矩阵 (Confusion Matrix)

## 4. 无监督学习 (Unsupervised Learning)

### 4.1 核心技术：聚类 (Clustering)

### 4.2 降维 (Dimension Reduction)：主成分分析 (PCA)

---

# 高级机器学习与深度学习应用

## 1. 现代NLP与序列模型

### 1.1 词嵌入 (Embeddings)

**定义：**

Learned representation for text where words that have the same meaning, have the same representation（一种由模型学习得到的文本表示方式。在这种表示中，**意思相近的词，其表示也相近**。）

- 单词被表示（映射）为一个**实数向量 (vector of real numbers)**，维度通常是 50, 100 或 300。
- 能够从语料库中提取一个或多个词的**含义 (meaning)**。
- 能够提取词语之间的**相似性 (similarity)**。

**Word2Vec：** 一种实现词嵌入的流行算法，是一个两层的神经网络，输入整个语料库，输出语料库中每个词的向量表示。

**两种训练算法：**

- **Continuous Bag of Words (CBOW)：根据上下文预测中心词**。就像做完形填空："今天天气很好，我们去公园 __ 散步"。模型需要根据上下文（"公园"、"散步"）来预测中间的词。
- **Skip-gram：根据中心词预测上下文**。

> 标准的 Skip-gram 模型只能给每个词一个固定向量，不能真正区分多义词（如 Apple 的两种意思）。不过它通过上下文学习到的语义空间，能**部分反映**多义词的模糊语义。若要精确区分多义词，需要使用**多义词向量模型或上下文词向量模型**：
> - **Multi-sense Skip-gram (MSSG)：** 一个词可以学出多个"语义原型"向量
> - **Sense2Vec：** 利用词性或语义标签（如 Apple|NOUN vs Apple|ORG）
> - **ELMo / BERT 等上下文词向量模型：** 根据具体句子上下文动态生成不同向量

CBOW 训练速度快，适合大型语料库；Skip-gram 在处理低频词时效果更好。

**分布假说：**

一个非常有用的定义叫做**范式相似性 (paradigmatic similarity)**，它的思想是：**相似的词出现在相似的上下文中。它们是可替换的。**

> "You shall know a word by the company it keeps."（观其伴，知其义）。Word2Vec 等算法就是这个假说的数学实现。

**与传统方法的对比：**

| 传统方法 - 词袋模型 | 词嵌入 |
|---|---|
| **One-Hot Encoding（独热编码）：** 词汇表中的每个词，用一个巨大的向量中的某一位表示为1，其余全是0。<br>**缺点：** 向量维度巨大；所有词向量之间都是**正交**的，无法计算相似度（比如"猫"和"狗"的点积是0）。**上下文信息没有被利用**。 | **把每个词表示为空间中的一个点**，用一个稠密向量（dense vector）表示，维度固定（通常是 300 维）。向量中的每个数都反映词的一些语义特征。<br>**无监督学习（unsupervised）：** 模型不需要人工标注，只需要通过阅读大量语料（huge corpus）就能自动学习到这些向量。 |

**词向量的神奇之处：**

```
vector[Queen] ≈ vector[King] - vector[Man] + vector[Woman]
vector[Paris] ≈ vector[France] - vector[Italy] + vector[Rome]
```

这可以被解读为："法国之于巴黎，就如同意大利之于罗马"。

**使用向量寻找相似词：**

任务：找到与 dog 这个词最相似的词。

步骤：计算词 dog 的向量与**所有其他词**的向量之间的相似度（通常是余弦相似度）。从数学上讲，这等价于一个**矩阵-向量乘法**：W · dog。取出得分向量中值最高的 k 个位置的索引，这些索引对应的单词就是最相似的词。

- W：整个词嵌入矩阵，每一行是一个词的向量。大小为 |V| x d (|V|是词汇表大小, d是向量维度)。

### 1.2 高级 Transformers 模型

- 大型语言模型 (LLMs) 概览

### 1.3 序列预测的神经网络

- 卷积神经网络 (CNNs)
- 循环神经网络 (RNNs)
- 长短期记忆网络 (LSTMs)

## 2. 时间序列与强化学习

### 2.1 时间序列分析 (Time Series)

传统方法：随机森林 (Random Forests), 梯度提升 (Gradient Boosting)

### 2.2 强化学习 (Reinforcement Learning) for Sequential Decision Making

## 3. 前沿状态空间模型

### 3.1 具有可学习组件的状态空间模型

### 3.2 神经卡尔曼滤波器 (Neural Kalman Filters)

### 3.3 变分自编码器 (Variational Autoencoder - VAE) for Time Series

---

# Python 工具箱

## 1. Python 基础

### 1.1 一些基础概念（DS向）

> 我感觉没什么好说的但是那个教授整理了这些，我翻译一下

- **代码** — 程序中的指令。
- **语法** — 有效的结构和命令。
- **输出** — 程序打印的消息。
- **命令行** — 解释器。
- **集成开发环境IDE** — 编写和测试软件的工具。

> 这个很有用啊或许吧 但是或许可以练一下英语 看那些叽里咕噜的英文课的时候听到这种词就听不懂了

**Variables and Data Types（变量和数据类型）**

```python
# Variable Assignment（变量赋值）
x = 5

# Calculations With Variables（变量计算）
x + 2   # 7
x - 2   # 3
x * 2   # 10
x ** 2  # 25（幂运算）
x % 2   # 1（取余）
x / float(2)  # 2.5

# Types and Type Conversion（类型与类型转换）
str(x)    # '5'
int(3.5)  # 3
float(5)  # 5.0
bool(1)   # True
```

**Strings（字符串）**

```python
my_string = 'thisStringIsAwesome'

# String Operations（字符串操作）
my_string * 2          # 'thisStringIsAwesomethisStringIsAwesome'
my_string + 'Innit'    # 'thisStringIsAwesomeInnit'
'm' in my_string       # True

# String Indexing & Slicing（索引从0开始）
my_string[3]     # 's'
my_string[4:9]   # 'Strin'

# String Methods（字符串方法）
my_string.upper()           # 转为大写
my_string.lower()           # 转为小写
my_string.count('w')        # 统计字符出现次数
my_string.replace('e', 'i') # 替换字符
my_string.strip()           # 去除首尾空格
```

**常用数据科学库：**
- **pandas：** Data analysis（数据分析）
- **NumPy：** Scientific computing（科学计算）
- **scikit-learn：** Machine learning（机器学习）
- **matplotlib：** 2D plotting（2D绘图）

**安装Python：**
- **ANACONDA：** 领先的开源数据科学平台
- **spyder：** Anaconda自带的免费IDE
- **jupyter：** 创建和分享包含代码、可视化、文本的文档

### 1.2 Python 语法

> 我感觉也没什么好说的很基础但还是扔进来了。

- Python 使用**缩进**
- 变量区分大小写，`myVar` is different than `myvar`
- 变量名必须字母开头，不能有空格，不能以数字开头，单词间不能使用 `-` 等运算符

### 1.3 数据结构

#### 1.3.1 列表 (List)

Python 中最常用、最灵活的数据容器，可以存储任意类型的元素，并且是有序的。

```python
# 创建列表
my_list = list()  # 或 my_list = []
new_list = ["frank", "heather"]

a = 'is'
b = 'nice'
my_list = ['my', 'list', a, b]
my_list2 = [[4,5,6,7], [3,4,5,6]]

# 索引（从0开始）
my_list[1]     # 索引1的元素
my_list[-3]    # 倒数第3个元素
my_list[1:3]   # 索引1和2的元素
my_list[1:]    # 索引0之后的所有元素
my_list[:3]    # 索引3之前的所有元素
my_list[:]     # 复制整个列表
my_list2[1][0] # 二维列表索引 -> 3

# 列表方法
my_list.append('!')     # 在末尾追加元素
my_list.extend('!')     # 追加可迭代对象的元素
my_list.remove('!')     # 移除指定元素
del(my_list[0:1])       # 删除指定位置的元素
my_list.reverse()       # 反转列表
my_list.pop(-1)         # 弹出并返回指定位置的元素
my_list.insert(0, '!') # 在指定位置插入元素
my_list.sort()          # 对列表进行排序
my_list.index(a)        # 获取元素的索引
my_list.count(a)        # 统计元素出现次数
len(my_list)            # 返回列表中的元素个数
```

**拷贝（Copying）：**
- **引用赋值（浅拷贝）：** `my_list_copy = my_list`。两个变量指向**同一个**列表对象，修改一个会影响另一个。
- **独立拷贝（深拷贝）：** `my_list_true_copy = my_list.copy()`。创建一个全新的、独立的列表副本。

#### 1.3.2 集合与集合逻辑

```python
my_set = set()  # 创建空集合
my_set.add("Julia")  # 添加元素（唯一性：重复添加不变）
```

集合是一种**无序**且**元素唯一**的集合。

| 操作方法 | 等价符号 | 结果描述 |
|---|---|---|
| `len(s)` | | 返回集合 s 中元素的数量 |
| `x in s` | | 测试元素 x 是否在集合 s 中 |
| `x not in s` | | 测试元素 x 是否不在集合 s 中 |
| `s.issubset(t)` | `s <= t` | 测试集合 s 是否为 t 的子集 |
| `s.issuperset(t)` | `s >= t` | 测试集合 s 是否为 t 的超集 |
| `s.union(t)` | `s \| t` | 返回并集 |
| `s.intersection(t)` | `s & t` | 返回交集 |
| `s.difference(t)` | `s - t` | 返回差集 |
| `s.symmetric_difference(t)` | `s ^ t` | 返回对称差集 |
| `s.copy()` | | 返回集合 s 的一个浅拷贝 |

**实际应用 - Jaccard 相似度：**
公式：Jaccard Similarity = (size of intersection) / (size of union)

实现步骤：将句子分词后转为集合，然后利用集合的交集和并集运算即可轻松实现。

#### 1.3.3 字典 (Dictionary)

`dict` 是一种以**键-值 (key-value) 对**形式存储数据的无序集合（在Python 3.7+ 中是有序的）。

```python
t_d = dict()  # 或 t_d = {}

# 增/改元素
t_d["key_a"] = "patrick"

# 访问元素
value = t_d["key_a"]

# 常用方法
t_d.keys()    # 返回所有键的视图
t_d.values()  # 返回所有值的视图
t_d.items()   # 返回所有(键, 值)元组的视图
```

**键的唯一性：** 字典中的键必须是唯一的。如果对一个已存在的键再次赋值，旧的值会被新的值**覆盖**。

#### 1.3.4 元组 (Tuple)

```python
a = (1, 2, 3)
```

这个我觉得没什么好说的。主要的用途就是一些不可更改的值，用来展现 RGB 啊之类的。类似于列表，但是元组不能修改。

### 1.4 流程控制

这里没什么好说的啊学过python就会。

- **for：** 遍历
- **while：** 循环，等到满足某个条件
- **if-elif-else：** 按顺序执行，但只执行一个模块

### 1.5 函数 (Functions)

#### 1.5.1 常规函数 (def)

这个就是定义一下，模块化，可复用。我觉得比叽里咕噜的C语言好用多了。

#### 1.5.2 Lambda 函数

一个没有名字的、小型的、临时的"一次性"函数。也被称为**匿名函数 (Anonymous Function)**。**非常强大 (VERY powerful)** 的工具。

**语法：**

```python
lambda arguments: expression
```

- **lambda：** 固定关键字
- **arguments：** 函数的参数，可以有零个、一个或多个
- **expression：** 函数的主体，必须是一个**单一的表达式**。Lambda 函数**不能包含复杂的语句**（如 if-else 多行块、for 循环、print 等）

```python
# 基础示例
lambda x: x + 1
(lambda x: x + 1)(2)  # = 3

# 赋值给变量
my_lambda = lambda x: x + 1
my_lambda(2)  # = 3

# 多参数
my_lambda_new = lambda x, y: x + y
my_lambda_new(1, 2)  # = 3
```

Lambda 函数最经典的用法是作为参数传递给高阶函数：

```python
# Map: 对每个元素执行某个操作
the_ar = [1,2,3,4,5]
the_ar_new = list(map(lambda x: x + 1, the_ar))
# the_ar_new = [2,3,4,5,6]

# Filter: 根据条件筛选元素
numbers = [1, 2, 3, 4, 5, 6]
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
# even_numbers -> [2, 4, 6]

# Reduce: 对序列进行累积计算（需要从 functools 导入）
list_of_sets = [{1, 2, 3}, {2, 3, 4}, {3, 4, 5}]
intersection_result = reduce(lambda s1, s2: s1.intersection(s2), list_of_sets)
# 输出: {3}
```

### 1.6 文件 I/O

```python
# Read（读）
f = open('<path_to_file>', 'r')

# Write（写，会覆盖原有内容）
f = open('<path_to_file>', 'w+')
f.write(text)

# Append（追加）
f = open('<path_to_file>', 'a+')

# 重要：永远记得最后要关闭文件
f.close()
```

### 1.7 推导式 (Comprehensions) - Pythonic写法

这是Python中一种非常优雅、简洁且高效的语法糖，用于从一个**可迭代对象快速创建新的列表或字典**。

```python
# 列表推导式 [expression for item in iterable if condition]
tok_len_a = [len(word) for word in test_corp_tok]

# 带条件的列表推导式
f_l_redux = [word for word in corp_te.split() if len(word) >= 5]

# 字典推导式 {key_expression: value_expression for item in iterable}
tok = c_ex.split()
w_f_redux = {word: tok.count(word) for word in set(tok)}
```

## 2. 数据科学核心库

### 2.1 Pandas

**核心优点：**
- Great data structure to leverage：提供了强大的数据结构（主要是DataFrame）
- Support multiple data types across columns：列可以支持不同的数据类型
- Easy to use：易于上手和使用
- Plenty of supported built-in operations：拥有大量内置的操作函数

```python
import pandas as pd

# 数据结构
s = pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])  # Series
df = pd.DataFrame(data_dict, columns=[...])  # DataFrame

# 数据导入
pd.read_csv(filename)
pd.read_table(filename)
pd.read_excel(filename)
pd.read_sql(query, connection_object)
pd.read_json(json_string)

# 数据导出
df.to_csv(filename)
df.to_excel(filename)
df.to_sql(table_name, connection_object)
df.to_json(filename)

# 查看数据
df.head(n)       # 前n行
df.tail(n)       # 后n行
df.shape()       # 行数和列数
df.info()        # 索引、数据类型和内存信息
df.describe()    # 摘要统计信息

# 数据选择 (iloc)
df.iloc[0]        # 第一行
df.iloc[-1]       # 最后一行
df.iloc[:,0]      # 第一列

# 数据选择 (loc)
df.loc[[0], [column labels]]
df.loc['row1':'row3', 'col1':'col3']

# 排序
df.sort_index()
df.sort_values(by='Column label')
df.sort_values(column2, ascending=False)

# 分组操作
df.groupby([column1, column2])
df.groupby(column1)[column2].mean()

# 统计函数
df.mean()
df.median()
df.std()
df.max()
df.min()
df.count()
```

**.apply(function) 方法：** 将一个自定义的函数应用到 DataFrame 的一整列（或一行）的**每一个元素**上。

```python
the_data["body_sw"] = the_data["body"].apply(rem_sw)
```

**.str.cat(sep=" ") 方法：** 将一个 Series 中的所有字符串元素**合并 (concatenate)** 成一个单一的、巨大的字符串。适合在进行全局词频统计或训练语言模型前，将所有文档合并成一个大语料库。

### 2.2 NumPy

```python
import numpy as np

# 创建数组
my_list = [1, 2, 3, 4]
my_array = np.array(my_list)
my_2darray = np.array([[1,2,3],[4,5,6]])

# 选择元素
my_array[1]         # 索引 -> 2
my_array[0:2]       # 切片 -> array([1, 2])
my_2darray[:,0]     # 二维索引 -> array([1, 4])

# 数组运算
my_array > 3        # array([False, False, False, True], dtype=bool)
my_array * 2        # array([2, 4, 6, 8])
my_array + np.array([5, 6, 7, 8])  # array([6, 8, 10, 12])

# 数组函数
my_array.shape          # 获取数组维度
np.append(other_array)  # 追加元素
np.insert(my_array, 1, 5)  # 插入元素
np.delete(my_array, [1])   # 删除元素
np.mean(my_array)       # 计算平均值
np.median(my_array)     # 计算中位数
np.std(my_array)        # 计算标准差
```

### 2.3 NLTK

> 用来学习的，生产里面不怎么用这个东西了

| 功能 | 方法 | 备注 |
|---|---|---|
| **分词** | `nltk.tokenize.word_tokenize()` / `sent_tokenize()` | spaCy 更好用 |
| **停用词移除** | `from nltk.corpus import stopwords` | 提供多种语言的标准停用词列表 |
| **词干提取** | `nltk.stem.PorterStemmer` / `LancasterStemmer` | |
| **词形还原** | `nltk.stem.WordNetLemmatizer` | 注意：为了准确，通常需要提供词性(POS)信息 |
| **语料库** | 超过50个语料库（古腾堡、布朗、电影评论等） | **学术研究和教学的宝库** |
| **词汇资源** | WordNet：查找同义词、反义词、词义、上位/下位词关系 | 在需要词汇级别语义关系的传统任务中仍然非常有用 |
| **词性标注** | `nltk.pos_tag(tokens)` | spaCy 和 Transformers 模型更好用 |
| **命名实体识别** | `nltk.ne_chunk(pos_tagged_tokens)` | |
| **经典分类器** | `nltk.NaiveBayesClassifier` | **不好用，小孩玩玩包** |

**总结：** 功能全面，用于学习，有一些资源接口。但没什么好用的。

### 2.4 scikit-learn

> 这是 Python 机器学习生态系统中**最核心、最流行**的库。专注于传统机器学习算法的开源Python库，提供了从数据预处理、模型训练到评估的一整套工具。

**设计哲学——一致性 (Consistency)：**

无论你使用的是线性回归、支持向量机还是随机森林，它们都遵循一套完全相同的API设计模式：

```python
model = ModelName(parameters)     # 实例化
model.fit(X_train, y_train)       # 训练
predictions = model.predict(X_test)  # 预测
score = model.score(X_test, y_test)  # 评估
```

**核心功能模块：**

**1. 数据预处理 (sklearn.preprocessing)**

- **特征缩放：** `StandardScaler`（标准化，均值0方差1）/ `MinMaxScaler`（归一化到[0,1]）
- **类别特征编码：** `OneHotEncoder`（独热编码）/ `LabelEncoder`（标签编码）
- **缺失值处理：** `SimpleImputer`（用均值、中位数、众数等填充）

**2. 特征工程 (sklearn.feature_extraction & decomposition)**

- **文本特征提取：** `CountVectorizer`（词频向量）/ `TfidfVectorizer`（TF-IDF向量）
- **降维：** `PCA`（主成分分析）/ `TSNE`（高维数据可视化）

**3. 模型选择与拆分 (sklearn.model_selection)**

- **数据集拆分：** `train_test_split`（黄金标准函数）
- **交叉验证：** `KFold`, `StratifiedKFold`
- **超参数调优：** `GridSearchCV`（网格搜索）/ `RandomizedSearchCV`（随机搜索）

**4. 监督学习模型**

分类：`LogisticRegression`, `SVC`, `KNeighborsClassifier`, `DecisionTreeClassifier`, `RandomForestClassifier`, `GradientBoostingClassifier`

回归：`LinearRegression`, `Ridge`, `Lasso`, `SVR`, `RandomForestRegressor`, `GradientBoostingRegressor`

**5. 无监督学习模型**

聚类：`KMeans`, `DBSCAN`, `AgglomerativeClustering`

异常检测：`IsolationForest`, `OneClassSVM`

**6. 模型评估 (sklearn.metrics)**

- 分类指标：`accuracy_score`, `precision_score`, `recall_score`, `f1_score`, `confusion_matrix`, `roc_auc_score`
- 回归指标：`mean_squared_error`, `r2_score`

**7. 流水线 (Pipeline)**

`Pipeline`：**这是一个神器！** 它可以将多个预处理步骤和一个最终模型串联成一个单一的对象。

好处：代码更简洁；**防止数据泄露 (Data Leakage)**；方便地将整个流程打包进行交叉验证或部署。

**模型持久化 (Model Persistence) (pickle)**

将训练好的机器学习模型保存到硬盘，以便在其他地方或未来重新加载使用，**避免每次都重新训练**。

- **效率：** 模型训练可能需要数小时甚至数天，保存后可以秒级加载。
- **一致性：** **预测时必须使用和训练时完全相同的预处理器 (Vectorizer)**。如果不用同一个 Vectorizer，词汇表和编码方式会不一致，导致预测出错。
- **部署：** 这是将模型部署到生产环境（如网站后台、API服务）的**必要步骤**。

**"训练"与"预测"分离的编程范式：**

- **训练脚本 (lec_4.py)：** 输入全量数据集 → fit 和 fit_transform → 输出保存到硬盘的**模型文件**和**预处理器文件**。
- **预测脚本 (clus_pred.py)：** 输入单个新数据点 → 加载保存好的文件，只使用 transform 和 predict → 输出对新数据点的预测结果。

### 2.5 math 库

```python
from math import *
```

| 命令名 | 描述 |
|---|---|
| `abs(value)` | absolute value（绝对值） |
| `ceil(value)` | rounds up（向上取整） |
| `floor(value)` | rounds down（向下取整） |
| `cos(value)` | cosine, in radians（余弦，弧度制） |
| `sin(value)` | sine, in radians（正弦，弧度制） |
| `log(value)` | logarithm, base e（自然对数） |
| `log10(value)` | logarithm, base 10（以10为底的对数） |
| `max(value1, value2)` | larger of two values（两个值中较大的） |
| `min(value1, value2)` | smaller of two values（两个值中较小的） |
| `round(value)` | nearest whole number（四舍五入到最近的整数） |
| `sqrt(value)` | square root（平方根） |

## 3. 核心技术专题

### 3.1 正则表达式 (Regular Expressions)

Regular Expression aka REGEX。Python中用于处理正则表达式的强大标准库是 `re`。

**核心re库函数：**

```python
re.findall(A, B)  # 在字符串B中查找所有匹配A的实例，以列表返回
re.search(A, B)   # 在字符串B中查找第一个匹配A的实例，返回匹配对象
re.split(A, B)    # 使用分隔符A切分字符串B，返回列表
re.sub(A, B, C)   # 在字符串C中，将所有匹配A的部分替换为B
```

**元字符速查表：**

| 元字符 | 名称 | 解释与示例 |
|---|---|---|
| `. (点)` | 通配符 | 匹配除换行符外的任意单个字符。`c.t` 可以匹配 "cat", "cot", "c_t" |
| `* (星号)` | 量词 | 匹配前一个字符出现0次或多次。`ca*t` 可以匹配 "ct", "cat", "caat" |
| `+ (加号)` | 量词 | 匹配前一个字符出现1次或多次。`ca+t` 可以匹配 "cat", "caat"，但不能匹配 "ct" |
| `? (问号)` | 量词 | 匹配前一个字符出现0次或1次。`colou?r` 可以匹配 "color" 和 "colour" |
| `\d` | 字符集 | 匹配任意一个数字（等价于 [0-9]） |
| `\w` | 字符集 | 匹配任意一个字母、数字或下划线（等价于 [a-zA-Z0-9_]） |
| `\s` | 字符集 | 匹配任意一个空白字符（空格, tab, 换行符等） |
| `[ ]` | 字符集 | 匹配方括号内的任意一个字符。`c[aeiou]t` 匹配 "cat", "cet", "cit", "cot", "cut" |
| `[^ ]` | 否定字符集 | 匹配除了方括号内的字符以外的任意一个字符。`[^0-9]` 匹配任意一个非数字字符 |
| `^ (脱字符)` | 锚点 | 匹配字符串的开头 |
| `$ (美元符)` | 锚点 | 匹配字符串的结尾 |
| `\| (竖线)` | 或 | 匹配两边任意一个 |
| `( ) (圆括号)` | 分组 | 将多个字符作为一个整体 |

**正则表达式用在哪里？**

- **数据清洗：** 从文本中删除所有非字母字符、标点符号、HTML标签等。`re.sub("[^A-Za-z]+", " ", text)` 就是用正则把所有非字母替换成空格。
- **数据提取/信息抽取：** 从大段文本中精准地抓取需要的信息，如电话号码、身份证号、日期、URL等。
- **表单验证：** 在网站注册时，验证你输入的邮箱格式、手机号码格式是否正确。
- **代码编辑器的查找替换：** 很多高级的代码编辑器（如VS Code）都支持使用正则表达式进行查找和替换。
- **日志分析：** 从服务器的大量日志文件中，匹配和提取出特定模式的错误信息或访问记录。

### 3.2 日期时间处理 (Datetime)

处理日期和时间是编程中**令人头疼的事情之一**。

```python
from datetime import *
```

**Python Datetime 格式化代码表：**

**第一部分：年、月、日、星期**

| Code（代码） | Meaning | 示例 |
|---|---|---|
| `%a` | 星期几的本地化缩写名称 | Mon |
| `%A` | 星期几的本地化完整名称 | Monday |
| `%w` | 星期几的数字表示（0=周日, 1=周一, ..., 6=周六） | 1 |
| `%d` | 月份中的日期（01-31），补零 | 30 |
| `%-d` | 月份中的日期（1-31），不补零 | 30 |
| `%b` | 月份的本地化缩写名称 | Sep |
| `%B` | 月份的本地化完整名称 | September |
| `%m` | 月份的数字表示（01-12），补零 | 9 |
| `%-m` | 月份的数字表示（1-12），不补零 | 9 |
| `%y` | 年份（两位数），不带世纪（00-99） | 13 |
| `%Y` | 年份（四位数），带世纪 | 2013 |

**第二部分：时、分、秒、时区**

| Code（代码） | Meaning（含义） | Example |
|---|---|---|
| `%H` | 小时（24小时制）（00-23），补零 | 7 |
| `%-H` | 小时（24小时制）（0-23），不补零 | 7 |
| `%I` | 小时（12小时制）（01-12），补零 | 7 |
| `%-I` | 小时（12小时制）（1-12），不补零 | 7 |
| `%p` | 本地化的 AM/PM 表示 | AM |
| `%M` | 分钟（00-59），补零 | 6 |
| `%-M` | 分钟（0-59），不补零 | 6 |
| `%S` | 秒（00-59），补零 | 5 |
| `%-S` | 秒（0-59），不补零 | 5 |
| `%f` | 微秒（000000-999999），左侧补零 | 0 |
| `%z` | UTC 时间偏移量，格式为 +HHMM 或 -HHMM | |
| `%Z` | 时区名称（Time zone name） | |

**第三部分：年度/周度计数与组合格式**

| Code（代码） | Meaning（含义） | Example |
|---|---|---|
| `%j` | 一年中的第几天（001-366），补零 | 273 |
| `%-j` | 一年中的第几天（1-366），不补零 | 273 |
| `%U` | 一年中的第几周（00-53），周日为一周第一天 | 39 |
| `%W` | 一年中的第几周（00-53），周一为一周第一天 | 39 |
| `%c` | 本地化的完整日期和时间表示 | Mon Sep 30 07:06:05 2013 |
| `%x` | 本地化的日期表示 | 09/30/13 |
| `%X` | 本地化的时间表示 | 7:06:05 |
| `%%` | 表示一个百分号字符 '%' 本身 | % |

---

# 课程代码实践（附录）

## 第一讲代码：Python 基础实践 [lec_1.py]

这个没什么难的，但是我让亲爱的Gemini老师生成了讲解。嗯讲的很清楚所以我也要扔进来显得我很认真。

[对lec_1.py的讲解](https://dcn2gtn35u7h.feishu.cn/wiki/MUbAwoKbvi6m47kgI4EciKqdnac)

## 第二讲代码：Python 基础实践 [lec_2.py]

展示了从基本数据结构到流程控制，再到代码封装（函数和模块）的完整过程。通过Jaccard相似度、文本清洗、词频统计等实例，展示了这些语法在**解决实际NLP问题**中的应用。

**[utils (2).py]**

`re.sub(pattern, repl, string)`：这是 Python 正则表达式模块 `re` 的替换函数，作用是在 `string` 中找到所有符合 `pattern` 规则的内容，替换成 `repl`（目标字符串）。`[^...]`：表示「非」。

[对lec_2.py的讲解](https://dcn2gtn35u7h.feishu.cn/wiki/WRXmwiRGtiUxcTkbnhYc7oBUnsh)

## 第三讲代码：NLP 预处理流水线 [lec_3.py]

**原始文件 -> [爬取与读取] -> 结构化数据 (DataFrame) -> [去停用词] -> 更干净的数据 -> [词干/词形还原] -> 规整化的数据 -> [词频统计] -> 初步的文本特征**

这个流程是进行后续**文本分类、情感分析、主题建模**等高级NLP任务的**必要基础**。

[对lec_3.py的讲解](https://dcn2gtn35u7h.feishu.cn/wiki/LUdkw4rmziX6O5kVO0OcSwkfnhe)

此外，这个代码主要是处理英文的！要处理中文的话我想到了jieba！所以我让G老师继续讲了以下：[中文ver.](https://dcn2gtn35u7h.feishu.cn/wiki/TMc5wYjQLiCSFBkdHcnco0JIn9f)

## 第四讲代码：机器学习工作流（聚类）[lec_4.py]

**机器学习项目代码**。展示了一个典型的NLP项目是如何从原始数据、模型训练，到模型应用的。

相关文件：`clus_pred.py` / `lec_4.py` / `utils (4).py`

[对lec_4.py的讲解](https://dcn2gtn35u7h.feishu.cn/wiki/S2btw1ojyiOy6zkt728cqgaenth)

## 第五讲代码：高级特征工程（LDA & Word Embeddings）

TODO: 补充第五讲相关内容