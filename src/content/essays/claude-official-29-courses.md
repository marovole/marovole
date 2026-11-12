---
title: "拆完 Claude 官方 29 门课，它早就不教背提示词了"
titleEn: "Inside Anthropic's 29 Official Courses: Beyond Prompting"
description: "翻完 Claude Academy 最新的 29 门官方课，最值钱的是 4D 人机框架、6 阶段研发交付链和 1 页纸 CLAUDE.md 铁律。"
descriptionEn: "Dissecting all 29 courses on Claude Academy: the 4D delegation framework, 6-stage delivery loop, and one-page CLAUDE.md discipline."
category: "深度拆解"
categoryEn: "Deep Teardown"
date: "2026-11-09"
cover: "/images/essays/card-courses.jpg"
order: 2
---

这两天还看到有人在转「Anthropic 官方开源提示词教程」，点进去一看，还是 GitHub 上那个 `anthropics/courses` 仓库（[GitHub API](https://api.github.com/repos/anthropics/courses)）。

那个仓库确实攒了 **22999** 颗星、**2547** 次 Fork，但它建于 **2024** 年 **5** 月 **30** 日，目前状态已经是归档停更（`archived: true`），最后一次代码推送停在 **2026** 年 **8** 月 **28** 日（[GitHub API](https://api.github.com/repos/anthropics/courses)）。翻开它的说明文件，里面一共只有 **5** 门课，而且明确写着为了帮学生省 API 费用，示例优先用当时最便宜的 Claude **3** Haiku（[仓库 README](https://raw.githubusercontent.com/anthropics/courses/master/README.md)）。

如果你顺着网上的旧攻略去找 Anthropic 的第二代课程站 `anthropic.skilljar.com`，一打开页面就会看到顶上挂着一条醒目的黄牌通知：这个旧版学习平台将在 **2026** 年 **12** 月初停止服务（[Skilljar 首页](https://anthropic.skilljar.com/)）。官方 FAQ 写得很清楚，旧站 `anthropic.skilljar.com` 在 **12** 月初关闭后，将无法再登录、查看历史记录或下载证书，必须在此之前用相同邮箱把进度导入新站（[Academy FAQ](https://academy.claude.com/help/faq)）。

真正活着的第三代官方大本营，叫 Claude Academy（`academy.claude.com`）。我把它的课程目录和所有单课大纲完整抓下来清点了一遍：全站一共聚合了 **322** 项学习资源（含教程与用例），其中正式课程已经扩充到了 **29** 门（[课程总表](https://academy.claude.com/all?kind=course)），而且全部免费开放，用免费账号登录就能保存进度、在带测验的课程里考取完成徽章，不需要付费订阅（[Academy FAQ](https://academy.claude.com/help/faq)）。

把这 **29** 门课从头到尾拆开看，最震撼的一件事是：连做模型的 Anthropic 自己，都已经不把重心放在教人写「酷炫提示词」上了。

我平时在非技术公司做一线 FDE，每天带不写代码的同事用 AI 干活，最常说的一句话就是：不用学写代码，学会像产品经理一样指挥 AI。看完 Anthropic 这套新课，你会发现官方教材跟一线实战踩在同一个点上。

## 一、先看全景：29 门课是怎么排兵布阵的

在 `academy.claude.com/courses` 的官方分类里，这 **29** 门课被切成了四大板块（[课程分类页](https://academy.claude.com/courses)）：

**第一板块：5 大核心产品入门（Start your journey，共 5 门）**

- 《Claude 101》（**13** 课、**1** 个测验、**2.5** 小时）：从第一次对话讲到桌面端的 **3** 种工作形态——逐轮交互（working turn by turn）、交办任务（handing work off）、构建软件（building software）（[Claude 101](https://academy.claude.com/courses/claude-101)）；
- 《Claude Code 101》（**12** 课、**1** 个测验、**1.5** 小时）：讲终端编程助手，核心是 `Explore → Plan → Code → Commit` 四步日常工作流（[Claude Code 101](https://academy.claude.com/courses/claude-code-101)）；
- 《Introduction to Claude Cowork》（**14** 课、**1** 个测验、**2.5** 小时）：专门教不写代码的知识工作者怎么让 Claude 直接读写本地文件夹、联动 Chrome 浏览器和 Office 文档干活（[Cowork 课程](https://academy.claude.com/courses/introduction-to-claude-cowork)）。顺带一提，官方在 **2026** 年 **9** 月 **16** 日宣布把 Cowork 和普通聊天合并成一个统一的 Claude，但这门课教的工作流依然管用（[合并公告](https://claude.com/blog/cowork-is-now-claude)）；
- 《Introduction to Claude Tag》（**11** 课、**1** 个测验、**2.5** 小时）：教团队怎么在 Slack 频道里直接 `@` Claude 派活，让全频道共享上下文和纠偏记录（[课程分类页](https://academy.claude.com/courses)）；
- 《Claude Platform 101》（**13** 课、**1** 个测验、**1.5** 小时）：教开发者跨越聊天框，先亲手写一遍 Agent 循环，再用 SDK 的 Tool Runner 收敛（[Platform 101](https://academy.claude.com/courses/claude-platform-101)）。

**第二板块：产品进阶与团队治理（Learn the products，共 7 门）**

这里全是实战硬菜：教你怎么跑长时无人值守会话的《Claude Code in action》（**9** 课、**1** 小时），教你把重复指令封装成自动触发 Markdown 的《Introduction to agent skills》（**6** 课、**1** 小时），教你用独立上下文窗口拆解任务的《Introduction to subagents》（**4** 课、**45** 分钟），两门 MCP 协议课（基础 **10** 课 **1** 小时、进阶 **11** 课 **1.5** 小时），一门讲企业落地的《Deploying Claude Enterprise with confidence》（**14** 课、**2.5** 小时，围绕结构与身份、访问权限、治理、支出、可见性 **5** 个决策展开），以及含金量最高的《The AI-native SDLC playbook》（**14** 课、**1** 小时）（[课程分类页](https://academy.claude.com/courses)）。

**第三板块：AI 素养与心智模型（Become AI fluent，共 12 门）**

包含 **3** 门通用底座课——《AI Fluency: Framework and foundations》（**14** 课、**4** 小时）、《AI capabilities and limitations》（**13** 课、**3.5** 小时）、《Building effective human-agent teams》（**5** 课、**45** 分钟），外加 **9** 门按人群定制的专班（覆盖产品与工程创造者 **9** 课、创意工作者 **8** 课、小企业 **8** 课、非营利组织 **9** 课、高校教师 **4** 课、基础教育教师 **10** 课、培训师 **4** 课、引导者 **7** 课、学生 **5** 课）（[课程分类页](https://academy.claude.com/courses)）。

**第四板块：API 与云厂商工程课（Build with the API，共 5 门）**

包含旗舰课《Building with the Claude API》（**67** 课、**8** 个测验、**9** 小时）、专讲生产环境工具调用避坑的《Tool use with the Messages API》（**9** 课、**1.5** 小时）、教你怎么用真实数据选模型的《Introduction to evals》（**4** 课、**1** 小时），以及 AWS Bedrock（**65** 课、**8** 小时）和 Google Cloud（**66** 课、**8.5** 小时）两门云平台大课（[课程分类页](https://academy.claude.com/courses)）。

## 二、普通人最该学的，是「4D 框架」与「4 条机器属性」

为什么很多人买了会员、存了一堆提示词，用起来还是觉得 AI 时灵时不灵？

《AI capabilities and limitations》这门课的简介说得很透：要帮学习者建立一套理解现代生成式 AI 为何如此表现的心智模型；当 AI 给出意料之外的输出时，你能分辨出它属于哪一类意外、判断任务落在了“能力到限制连续谱”的哪个位置，并给出针对性的修复方案（[能力与限制课](https://anthropic.skilljar.com/ai-capabilities-and-limitations)）。

为了建立这套心智模型，Anthropic 找来 Ringling 艺术与设计学院的 Rick Dakan 教授和爱尔兰科克大学的 Joseph Feller 教授（两人在 **2023-2024** 年间开发了这套框架），合作推出了《AI Fluency》核心课。官方在课程页里明明白白写了一句话：我们要帮人们有效且负责任地与 AI 协作，**超越单纯的“酷炫提示词（beyond just cool prompts）”**（[AI Fluency 课](https://anthropic.skilljar.com/ai-fluency-framework-foundations)）。

这两门姊妹课给出了一个非常对称的双面模型：

一面是《AI capabilities and limitations》拆解的**机器 4 大核心属性**——逐词预测（Next Token Prediction）、知识（Knowledge）、工作记忆（Working Memory）、可控性（Steerability）以及上下文限制（context limits），课程大纲最后还专门讲了“当这些属性发生碰撞时（When Properties Collide）”该如何应对（[能力与限制课](https://anthropic.skilljar.com/ai-capabilities-and-limitations)，[课程总表](https://academy.claude.com/all?kind=course)）。

另一面是**人类的 4D 能力**（[AI Fluency 课](https://anthropic.skilljar.com/ai-fluency-framework-foundations)）：

1. **委派（Delegation）**：做系统的项目规划，先想清楚什么活交给 AI，什么判断必须留在自己手里；
2. **描述（Description）**：写出清晰的提示词与背景约束；
3. **鉴别（Discernment）**：批判性地评估 AI 的产出，并在“描述—鉴别循环（description-discernment loop）”中持续迭代；
4. **尽责（Diligence）**：确保人机协作符合伦理与安全，对最终结果兜底负责。

你看，这四个词翻译成我们平时工作的大白话，不就是产品经理每天干的三件事吗：说清需求（Description）、拆成步骤交出去（Delegation）、验收结果并兜底（Discernment + Diligence）。

## 三、写代码不再是瓶颈，6 个阶段的交付文件链才是

如果只挑一门课精读，我强烈建议看《The AI-native SDLC playbook》（共 **14** 课、**12** 个打法，同时放出了完整图文版）（[SDLC 课程](https://academy.claude.com/courses/ai-native-sdlc-playbook)）。

这本手册开篇第一句判断非常狠：**写代码已经不再是瓶颈了**。当 AI 让构建阶段压缩到几个小时，真正的瓶颈移到了代码左右两边的步骤——主要是计划、评审/测试和部署，因为这些环节还在按人类的速度运转（[SDLC 手册](https://claude.com/blog/the-ai-native-sdlc-playbook)）。

怎么破这个局？官方给出的答案是：**每一个阶段结束时，都必须向版本控制系统提交一份交付物（committed artifact），下一阶段靠读取这份交付物启动**；早期阶段以人机都能直接读写的 `.md` 纯文本文件为主，从构建阶段起则是代码及其审查与事件记录（[SDLC 手册](https://claude.com/blog/the-ai-native-sdlc-playbook)）。

整条研发流水线被串成了 **6** 个环环相扣的阶段契约：

- **第 1 阶段（计划 Plan）**：不再等产品经理开几周会写长篇大论。发起人直接跟 Claude 口述痛点，生成一份 `intent.md`（写清问题、目标、受影响系统和约束），提交进仓库（[SDLC 手册](https://claude.com/blog/the-ai-native-sdlc-playbook)）。
- **第 2 阶段（设计 Design）**：把以往分开的需求和设计压进一次会话。Claude 读取 `intent.md`，同时挂载公司的品牌、安全、合规和体验 Skills，直接产出标好风险点的 `spec.md`（[SDLC 手册](https://claude.com/blog/the-ai-native-sdlc-playbook)）。
- **第 3 阶段（构建 Build）**：工程师默认用 Plan Mode 启动，先让 Claude 读完 `spec.md` 写出改哪些文件、按什么顺序改、用什么测试证明的 `plan.md`，人审完计划才准写代码（[SDLC 手册](https://claude.com/blog/the-ai-native-sdlc-playbook)）。
- **第 4 阶段（测试 Test）**：给 Claude 装上自检闭环，并且由平台工程师从近期工作里收集 **20** 到 **50** 个真实任务建成连续评测集，只要有人改了 `CLAUDE.md`、Skills 或 Hooks，CI 就自动跑一遍回归测试（[SDLC 手册](https://claude.com/blog/the-ai-native-sdlc-playbook)）。
- **第 5 阶段（部署 Deploy）**：技术负责人写好 `REVIEW.md`，让 AI 按 Bugs、Security、Compliance 三轮过筛，而且规定每次审查最多只准报 **5** 条细枝末节的 Nit，其余直接汇总成数字，把人的精力省下来看核心风险（[SDLC 手册](https://claude.com/blog/the-ai-native-sdlc-playbook)）。
- **第 6 阶段（维护 Maintain）**：用确定性监控脚本盯线上指标，偏离 **1σ** 只记日志，偏离 **2σ** 唤醒 Claude 只读诊断，偏离 **3σ** 才允许它提 PR 或触发预批的回滚脚本，并把诊断结果写成新的 `intent.md` 重新送回第 **1** 阶段（[SDLC 手册](https://claude.com/blog/the-ai-native-sdlc-playbook)）。同时配合运行在 Claude Mythos **5** 上的 Claude Security 定期扫库（[SDLC 手册](https://claude.com/blog/the-ai-native-sdlc-playbook)）。

我特别喜欢手册里关于 `CLAUDE.md`、Skills、Hooks 和并行会话的几条硬规矩，全是吃过亏才写得出来的实话：

- **`CLAUDE.md` 犯错两次才写，且绝不超过一页纸**：官方建议先跑 `/init` 生成初稿，然后砍到只剩新员工第一天要用的命令和规范。立一条规矩——**当 Claude 同一个错误犯了两次，才把纠正写进 `CLAUDE.md`；而且全文必须保持在一页以内**，因为每次开新会话它都要通读一遍，过时的废话只会白白占掉上下文（[SDLC 手册](https://claude.com/blog/the-ai-native-sdlc-playbook)）。
- **Skill 是建议，Hook 才是铁律**：手册直言，Skill 只是一种建议性控制（advisory control），没有任何机制能强迫某次会话一定遵守它；真正不能破的底线（比如严禁在修 Bug 时修改测试文件、未获发布授权时用 `exit 2` 直接阻断生产部署命令），必须用确定性的 Hook 脚本在底层拦死（[SDLC 手册](https://claude.com/blog/the-ai-native-sdlc-playbook)）。
- **并行会话起步 2 到 3 个就够了**：用 Git Worktree 可以同时开几个 Claude 干活，但官方提醒，**2** 或 **3** 个会话才是合理的起点，真正的上限不在于机器能跑多少个，而在于一个人能认真审完多少条分支（[SDLC 手册](https://claude.com/blog/the-ai-native-sdlc-playbook)）。

## 四、选模型别看公开跑分榜，看你自己的任务账单

最后提一下只有 **4** 节课、**1** 小时的《Introduction to evals》。这门课的第一句话就足够让很多盲目追榜一的人冷静下来：**没有任何公开的模型对比评测见过你的提示词（No published model comparison has seen your prompt）**（[Evals 课程](https://academy.claude.com/courses/introduction-to-evals)）。

官方教的选模四步法非常克制（[Evals 课程](https://academy.claude.com/courses/introduction-to-evals)）：

1. 先算清楚答错一次要付出多大代价，由此定出你的准确率底线（accuracy floor）；
2. 用你自己的真实数据建一个小测试集，按「每完成一个任务的成本（cost per completed task）」去挑能过底线的最便宜模型；
3. 精确字段用代码打分，自由文本用大模型配合评分表打分；
4. **遇到得分不够，先根据失败用例修提示词，修到头了再去升级更贵的模型。**

## 五、我还没想清楚的地方

我已经把这 **29** 门课的完整目录、每门课的核心拆解以及四类人群的最短学习路径，整理成了一份完整的教学索引文档放进了知识库。

但拆完这套课程，我心里也留了一个问号。

Anthropic 在《The AI-native SDLC playbook》里描绘的那条流水线——从业务人员口述生成 `intent.md`，到自动触发 `spec.md`、`plan.md`，再到 `1σ/2σ/3σ` 监控脚本自动写回新需求——在工程逻辑上漂亮得像一块机械表。可回到我每天待的非技术公司现场，让完全没碰过版本控制的业务同事，习惯每次提需求都不发微信语音、而是跟 AI 对话提交一份结构化的 `intent.md`，中间那道组织习惯的摩擦到底要花多久才能磨平？

当官方把 **29** 门课免费摆在桌上，工具和方法其实已经彻底摊牌了。不用学写代码，学会像产品经理一样指挥 AI——接下来拉开差距的，大概是谁真正在自己的工作流里写下了第一份不超过一页纸的规矩文档。
