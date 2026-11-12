---
title: "为什么 Hermes 依然是我的主力，远超 Grokbot 与 Muse"
titleEn: "Why Open-Source Hermes Remains My Daily Driver Over Grokbot & Muse"
description: "24 小时在线的个人 Agent 打成一团，拆解决定长期主力的三道分水岭：纯文本主权、跨厂商模型路由与可进化的本地技能库。"
descriptionEn: "Three architectural watersheds that separate sovereign, plain-text local Agent OS from locked-in cloud wrappers."
category: "架构立场"
categoryEn: "System Architecture"
date: "2026-11-07"
cover: "/images/essays/card-hermes.jpg"
order: 3
---

最近几个月，「全天候在线的个人 Agent」突然成了大厂标配。

8 月 11 日，[SpaceX Super Intelligence（原 xAI）推出 Grok Bot 测试版](https://upsy.ai/guides/grok-bot-vs-muse)，主打「给你分配一台专属云端电脑、可同时驱使多个 AI 同事」，10 月 12 日起并入 The X Subscription（含 Grok Bot 的档位从每月 30 美元的 Premium 档起，Super 档 100 美元、Ultra 档 200 美元）。9 月 8 日，[Meta 发布个人 Agent 产品 Muse](https://grokbotschool.com/muse-vs-grokbot/)，跑在专属的「Muse 安全虚拟机」里，基础免费（有周额度上限，首次开通需绑卡），付费的 Power 档每月 20 美元、Maximum 档每月 100 美元，[据扎克伯格在 10 月财报电话会上披露，上线不到两个月已在美加攒下 1000 万用户](https://techcrunch.com/2026/11/06/meta-introduces-spaces-a-new-way-to-collaborate-with-your-muse-agent/)。再加上 9 月 29 日 OpenAI 面向 Pro 和 Business Premium 推出的 dots，大厂把「云端虚拟机 + 应用连接器 + 7×24 小时后台干活」做成了标准答案。

但我每天真正用来干重活的主力，依然是 [Nous Research 开源的 Hermes Agent](https://hermes-agent.nousresearch.com/)。

这不是因为开源情怀。作为一个做了 12 年产品、现在同时写代码和做内容的人，我挑主力工具只看一件事：当工作流跑上三个月、沉淀下几百条规则之后，这套系统到底是越用越顺手，还是变成一个随时会卡脖子的黑盒。

先用一半篇幅把 Hermes Agent 到底是什么讲清楚，再拆解为什么在 Grok Bot（媒体亦常写作 Grokbot）和 Muse 面前，它依然是我不可替代的主力。

## 一、Hermes Agent 是什么？

按 [GitHub 官方仓库](https://raw.githubusercontent.com/NousResearch/hermes-agent/main/README.md)的定义，Hermes Agent 是 Nous Research 用 MIT 协议完全开源的「自我进化型 AI Agent（self-improving AI agent）」。你可以把它装在自己的电脑、每月 5 美元的 VPS 云服务器或者集群上，也可以直接下载 macOS 或 Windows 的桌面端（Linux 则通过一行终端命令安装）。

如果只看表面功能，它和 Grok Bot、Muse 很像：都能操作终端和浏览器、都能定计划跑后台任务、都能接各种聊天软件。但往底层看，Hermes 的架构建立在四个完全不同的工程模块上：

### 1. 内置的「记忆 + 技能」双层学习闭环

这是 Hermes 官方强调的核心差异点。大多数 Agent 的记忆是一锅粥，而 [Hermes 的文档](https://hermes-agent.nousresearch.com/docs/reference/faq)把持久化认知严格拆成两层：**记忆（Memory）存事实，技能（Skills）存流程。**

在[记忆层](https://hermes-agent.nousresearch.com/docs/user-guide/features/memory)，Hermes 在本地维护两个极度克制的文件：`MEMORY.md`（记录环境信息、项目惯例和踩坑教训，硬上限 2200 个字符，约 800 个 token）和 `USER.md`（记录用户的身份、沟通偏好与红线，硬上限 1375 个字符，约 500 个 token）。每次会话启动时，这两个文件作为冻结快照注入系统提示词，既保证了前缀缓存（prefix cache）命中率，又防止记忆无限膨胀拖垮上下文。当字符写满时，它不会静默丢弃旧记忆，而是报错并要求 Agent 在同一轮把过时条目合并或修剪。至于这 1300 个 token 装不下的历史细节，Hermes 另有一条并行通道：所有会话都会全量存进本地 SQLite 数据库（`~/.hermes/state.db`），通过 FTS5 全文检索（`session_search`）在大约 20 毫秒内按需召回；按记忆文档的说明，检索直接返回数据库原文、不做 LLM 总结，因此不产生 LLM 调用费。

在[技能层](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills)，所有标准作业程序（SOP）都以 Markdown 文件（`SKILL.md`）的形式存在本地 `~/.hermes/skills/` 目录下，兼容 [agentskills.io](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills) 开放标准。它采用三级「渐进式披露（Progressive Disclosure）」：第 0 级只把技能名、一句话简介和分类常驻在系统提示词里（全部加起来约 3000 个 token）；只有当任务真的匹配时，才调用 `skill_view` 加载第 1 级完整操作手册和第 2 级参考资料。更关键的是，做完复杂任务后它会自己创建新技能，在后续使用中发现命令变了或踩了新坑，还会直接原地修补（patch）这份技能文档。你也可以随时敲一行 `/learn`，把一个本地代码库、在线文档甚至一整本 PDF 书直接蒸馏成结构化的知识库技能。

### 2. 模型与工具的完全解耦

Grok Bot 跑在 Cursor 云端并打包在 X 订阅里，Muse 跑在 Meta 的专属安全虚拟机里。而 Hermes 支持任何兼容 OpenAI 接口的模型服务：OpenRouter、Anthropic、OpenAI、Google Gemini、智谱 GLM、月之暗面 Kimi、MiniMax，或者本机跑的 Ollama、vLLM、llama.cpp 和 SGLang。敲一行 `hermes model` 就能随时切换，没有任何供应商锁定。如果你嫌配五六个 API Key 太烦，官方也提供了可选的 Nous Portal 订阅（除 0 美元按量付费且仅限免费模型的 Free 档外，提供 Plus 档每月 20 美元、Super 档每月 100 美元、Ultra 档每月 200 美元），一键接通 300 多个模型（注：官网首页营销区块写的是 200 多个，README 与 FAQ 均为 300 多个）和云端工具网关。

### 3. 单网关全平台与多后端沙箱

Hermes 把终端 TUI、桌面端和消息网关（`hermes gateway`）统一在同一个内核下。你在电脑终端里开了一半的活，出门坐地铁时可以直接在 Telegram、Discord、Slack、WhatsApp、Signal 或邮件里接着聊，共享同一份记忆与上下文。

在执行层，按 README 说明，它内置了 6 种终端后端：本地（local）、Docker、SSH、Modal、Daytona 和 Vercel Sandbox，并支持 Singularity 等插件后端（官网首页则简写为含 Singularity 在内的 5 种后端）。其中 Modal 和 Daytona 支持无服务器持久化——Agent 不干活时环境自动休眠，几乎不花钱；来活时按需唤醒。

### 4. 子 Agent 委派与可锁模型的定时调度

遇到重度任务，Hermes 可以派生出隔离的子 Agent（subagents），各自拥有独立的对话上下文和终端，甚至能写 Python 脚本通过 RPC 批量调用工具，把几十步的机械流水线折叠成零上下文消耗的一步。

它的[定时任务系统（Cron）](https://hermes-agent.nousresearch.com/docs/user-guide/features/cron)也不是简单的「到点发条消息」。每个定时任务都可以单独绑定技能（`--skill`）、单独指定工作目录（`--workdir`，自动加载该项目下的 `AGENTS.md` 或 `CLAUDE.md`），更重要的是**支持按任务锁定模型（per-job pin）与推理强度（reasoning effort）**，甚至支持完全不调大模型的纯脚本模式（no-agent mode）。

---

## 二、为什么它远超 Grok Bot 和 Muse？我的三条判断

把产品说明书合上，回到真实的工作流。为什么在 Grok Bot 和 Muse 声势浩大的时候，我依然把全部核心管线放在 Hermes 上？我的判断集中在三条分水岭上。

### 第一，「纯文本主权」对决「云端黑盒锁定」

Grok Bot 和 Muse 的产品逻辑，是替你在云端租一台看不见的电脑，让你把邮箱、日历、Slack、Notion 授权给它，再让它在云端记住你的习惯。但 [Upsy 的对比实测](https://upsy.ai/guides/grok-bot-vs-muse)点破了一个极其现实的痛点：**Muse 和 Grok Bot 之间不共享任何东西——不共享连接器、不共享记忆，也不共享历史记录。**

更麻烦的是云端黑盒带来的失控感。根据同一份评测汇总的社区反馈与官方说明：
- 在 Muse 一侧，Meta 官方帮助中心提醒用户 Muse 可能会采取「意料之外的行动（may take unexpected actions）」，而且你断开某个应用连接后，Muse 之前用过的数据仍可能留在它的记忆里；今年 9 月 20 日起，亚马逊直接封禁了 Muse 访问 Amazon.com。此外，Muse 目前只在美国、加拿大、日本和新加坡四个国家开放。
- 在 Grok Bot 一侧，你创建的所有 Bot 共享同一台云端电脑的文件、浏览器会话和登录态，据 Upsy 转述其安全文档，每个 Bot 的屏幕并不是独立的安全边界（not a security boundary）；Cursor 论坛里也有用户反馈第二个 Gmail 账号授权状态显示「已添加」后又退回「待授权」、在云端浏览器登录 Outlook 后遇到 Microsoft 365 账号锁定等摩擦。

这就是我常说的**「纯文本主权（Plain-Text Sovereignty）」**问题。在 Grok Bot 或 Muse 里，你调教了几个月的业务流程、踩坑记录和偏好，是锁在别人数据库里的私有状态；一旦厂商改策略、涨价、封号或者被对手屏蔽，你的工作流当场归零。

而在 Hermes 里，我所有的心血都躺在本地硬盘的 `~/.hermes/` 下：记忆是两个透明的 Markdown 文件，几十套工作流是标准的 `SKILL.md` 文件夹；装好官方的 `agent-importers` 插件后，一条 `hermes import-agent` 命令就能直接从 OpenClaw、Claude Code、Codex CLI 或 Cursor 导入配置、记忆与技能。我可以把整个技能目录放进自己的 Git 仓库。**给我的工作流装上「撤销键（Git Commit）」和「验收台（Pull Request）」，工具随时可以换，但沉淀下来的纯文本认知资产永远归我所有。**

### 第二，真实生产管线靠的是「按工种换模型家族」，不是单模型包打天下

很多人刚开始用 Agent 时有个错觉：只要绑上最强的旗舰模型，挂在后台就能万事大吉。但在日常高频运转的真实管线里，单模型绑定是一场成本和稳定性的灾难。

Grok Bot 和 Muse 本质上都是大厂自家的闭环入口。但在我的日常主力架构里，不同任务对模型的要求天差地别：
- 写深度文章，我需要文笔最细腻的模型；
- 每天早上 6 点跑全网情报抓取和结构化清洗，我需要高吞吐、低成本的编码或推理模型；
- 派出去并行查资料的十几个子任务（subagents），需要响应极快的轻量模型；
- 而在发布前的「事实核查（Grounding Review）」环节，**核查模型必须和写稿模型来自不同的家族**——让同一个模型自己审自己写的稿子，幻觉会原封不动地漏过去。

这套「按工种跨模型家族调配主会话、定时任务、子 Agent 与独立审稿」的异构路由，在 Grok Bot 和 Muse 里搭不出来。而在 Hermes 里，它是原生支持的一等公民：我可以在聊天窗口用 `/model` 切交互模型，在 Desktop 设置里给子 Agent 指定另一套模型和限额，再用 `hermes cron edit --provider ... --model ...` 把每天定时跑的简报任务死死钉在专属模型上，互不干扰。当某一家上游 API 抽风或限流时，Hermes 的 fallback 链条还能自动切去备用节点，整条生产线不会因为一家厂商宕机而停摆。

### 第三，「生成便宜，验证昂贵」：严肃交付需要硬门禁，不是拟人化的「AI 同事」

[TechCrunch 在 11 月 6 日的报道](https://techcrunch.com/2026/11/06/meta-introduces-spaces-a-new-way-to-collaborate-with-your-muse-agent/)里用了一个很传神的词形容 Muse、Grokbot 和 OpenAI dots：它们都在用「可爱讨喜的卡通形象（cute and cuddly AI agents / cartoonish personas）」包装自己。Grok Bot 让你在群聊里像喊同事一样 `@bot`，Muse 推出了语音视频聊天（Muse Voice），以及围绕单个目标自动刷新演唱会日期、价格变动或攒钱进度的 Spaces 面板（比如婚礼筹备、节日礼物追踪，扎克伯格自己还用它做了个烧烤小游戏和家居控制面板）。

如果是帮我订个餐厅、盯一下价格变动，这种拟人化的交互非常讨喜。但如果是做严肃的产品研发、行业研究或日更内容生产，**拟人化往往是在掩盖工程控制的缺失**。

到了 2026 年底，生成一段代码或一篇初稿的成本已经跌穿地板，真正昂贵的是**验证（Verification）**——怎么保证 Agent 没有拿着过期的旧闻当今日新闻？怎么保证它没有在遇到报错时悄悄跳过步骤、然后自信地向你谎报完工？

遵循**「先改工作流，再挂模型」**的原则，[Grok Bot 那种「你演示一遍流程，它存成常规任务（routine）下次按计划自己跑」](https://x.ai/bot)的模式，安全与审批边界由云端平台定义，很难嵌进我自定义的底层代码闸门。而在 Hermes 里，因为整个系统就跑在我可控的本地文件系统和 Python 环境上，我可以把极其严苛的「验收台」直接焊死在技能和脚本里：
1. 我把事实核查规则写进本地的 `content-grounding` 技能，要求任何文章引用的数字、日期和引语，都必须先用脚本把网页原文抓进本地证据库，逐字比对通过后，再调用另一个独立模型做交叉复核；
2. 我把这道检查直接嵌进生成草稿的脚本入口——只要机器核查没打出 `GROUNDED OK` 和 `REVIEW PASSED`，脚本直接退出，Agent 连调用公众号草稿箱 API 的机会都没有；
3. 至于不需要大模型发挥创意的同步备份动作，直接挂成 Hermes Cron 的 `no_agent` 纯脚本模式，零 token 消耗、零幻觉风险。

这种「把人类的工程红线编译成不可绕过的代码闸门，再让 Agent 在笼子里全速奔跑」的掌控感，是任何托管在云端的卡通助手都给不了的。

---

## 三、对普通人和团队意味着什么？

客观地讲，这三款工具本来就不是给同一批人修的路。[Grokbot School 的横向对比](https://grokbotschool.com/muse-vs-grokbot/)和 [Upsy 的选型指南](https://upsy.ai/guides/grok-bot-vs-muse)给过很实在的划分：
- 如果你人在美加日新、日常活在 WhatsApp 里，想找个免费助手处理生活杂事、预订和购物，选 **Muse**；
- 如果你已经订了 The X Subscription 的 Premium 档（每月 30 美元）及以上，或旧版 X Premium+、SuperGrok、Cursor Pro 及以上计划，想快速拉起几个围绕 Gmail、Google Drive、Slack、Notion 转的业务小助手，选 **Grok Bot**；
- 但如果你希望把 AI 真正变成自己或团队的核心生产资料——不想被单一模型绑架、不想把私有工作流锁在别人的云端黑盒里、需要用「撤销键与验收台」管住交付质量——那么开源、可自托管、自带「记忆+技能」进化闭环的 **Hermes Agent**，依然是目前唯一能当重装主力用的底座。

## 我还没想清楚的地方

最后留两个我自己也在持续观察、还没有定论的问题：

第一，**普通非技术白领的上手门槛到底能降到多低？** Hermes 虽然已经推出了 macOS 与 Windows 桌面端、全平台命令行以及一键接入的 Nous Portal，但它的精髓依然在于本地文件组织、技能编排和终端沙箱。对于完全没碰过命令行的业务同事，是让他们直接用 Grok Bot 这类开箱即用的托管服务，还是由团队里的前线部署工程师（FDE）帮他们把 Hermes 配好、封装好现成技能再交付使用？我在公司内部带非技术同事落地时走的是后一条路，但对没有技术支援的纯个人小白来说，这道门槛依然真实存在。

第二，**当一个配置文件里的技能积累到几百个之后，渐进式披露会不会遇到检索瓶颈？** 目前 Hermes 靠约 3000 个 token 的技能目录索引按需加载，在百十个技能的规模下非常稳健。但如果使用周期拉长到两年、一个重度用户的技能库膨胀到上千个时，纯靠系统提示词里的目录匹配还能不能保持现在的精准度？这需要更长时间的真实运行数据来给出答案。

你现在的日常主力 Agent 是哪一个？你更看重开箱即用的省心，还是纯文本与模型自由的可控感？欢迎在评论区聊聊。
