---
title: "你天天用 Codex，却没给它装「撤销键」"
titleEn: "You Use Coding Agents Daily Without an Undo Button"
description: "已经让 Agent 替你改文档、做表格的白领，最该补的不是编程，而是 GitHub 里的两样东西：提交是撤销键，PR 是验收台。"
descriptionEn: "Non-developers delegating docs and spreadsheets to CLI agents need Git commits as save-points and PRs as visual acceptance desks."
category: "零基础 AI 说明书"
categoryEn: "FDE Field Manual"
date: "2026-10-19"
cover: "/images/essays/card-undo.jpg"
order: 1
takeaways: ["OpenAI Codex 默认前提是目录存在 Git 版本库，开新任务不会自动找回另一任务未提交的改动。", "非开发者只需掌握 4 个原语：仓库 = 项目文件夹，Commit = 手动存档点（撤销键），Branch = 平行试错副本，PR = 交作业差异验收单。", "GitHub 官方入门明确无需编程基础；截至 2026 年 7 月用户已突破 2.25 亿。"]
takeawaysEn: ["CLI and cloud coding agents assume Git version control; uncommitted changes in isolated workspaces are not automatically recoverable.", "Non-coders only need four Git primitives: Repo (project folder), Commit (manual save-point / undo button), Branch (safe sandbox copy), and PR (visual acceptance checklist).", "GitHub requires zero programming knowledge to adopt as an Agent document safety net (surpassing 225M users as of July 2026)."]
---

![示意动画](/images/essays/github-for-agent-users/s1_save.gif)
*图 1　提交与回退示意动画（作者用代码制作，仅作示意）*

设想一个常见场景：你让 Codex 改周报、整理表格，它一口气改了很多处，其中一处改坏了。你想退回昨天的版本，却发现根本没有「昨天的版本」。

OpenAI 在 Codex 云端的帮助文档里写得很直白：开一个新任务，会建一个独立的工作区，**不会找回另一个任务里没有提交的改动**；重要的工作，要提交到版本库。

这句话里藏着一个前提：Codex 默认你是有版本库的。

再看一个细节。有第三方开发者实测过 Codex 的命令行模式：`codex exec` 在一个既不是 Git 仓库、上级目录里也没有 `.git` 的文件夹里运行，会直接报错退出。命令行帮助里确实有个参数能绕过，说明写的是「允许在 Git 仓库之外运行 Codex」。能绕，但绕过去，你就少了一套存档。

所以这篇想讲清楚一件事：**白领学 GitHub，不是学编程，是给已经在用的 Agent 装上撤销键和验收台。**

## 先放下顾虑：官方说不用会写代码

GitHub 官方的入门教程叫 Hello World，列出的前提条件是：有一个 GitHub 账号；同时写明：你不需要会写代码、不需要会用命令行，也不需要安装 Git（GitHub 底层用的版本控制软件）。

GitHub 的专家服务目录里也有一项「面向非开发者的 GitHub」培训，目标学员写的是项目经理和技术写作者，内容是在非技术场景里使用 GitHub 的基础。

不写代码的人来 GitHub，也不是新鲜事。据极客公园的报道，GitHub 用户在 2023 年初刚突破 1 亿，2025 年 9 月达到 1.8 亿，按微软披露的数据，截至 2026 年 7 月已突破 2.25 亿。报道还转述了 GitHub 官方报告里的一句话：看到了 AI 在推动人们对软件开发的兴趣，但无法完全解释数据反映出的激增。

## 四个词，换成白领的说法

GitHub 的术语很多，Agent 用户真正用得上的只有四个。

**一、仓库（Repository）= 一个项目文件夹**

官方教程的比喻就是文件夹：仓库里可以放文件、图片、视频，甚至别的文件夹，通常把属于同一个项目的东西放在一起。

对 Agent 用户来说，可以把一个项目的材料都放进同一个仓库，再让 Agent 在这个仓库里干活。

**二、提交（Commit）= 手动存档点**

GitHub 文档对版本控制的描述是：项目的任何一个早期版本，都可以随时找回来。这些历史以「提交」的形式保存，就像一张张按时间排好的快照。

要注意，存档不是自动的。在 GitHub 网页上改完文件，要点一下「Commit changes」才算存下这一档。Agent 改完一轮，你确认没问题，就让它提交一次；下一轮改坏了，退回上一个存档即可。

**三、分支（Branch）= 一份平行副本**

教程里的说法是：分支让一个仓库同时存在不同的版本。默认有一个叫 `main` 的主分支，你从它拉出一个新分支，相当于复制了一份当时的快照；在新分支上的改动，合并之前不会出现在主分支上。

这正适合让 Agent 试错：让它在副本里大改，正本不受影响。Codex 还用到了 Git 的另一项功能「工作树」（worktree），让同一个项目里的多个对话各自独立运行、互不干扰。

![示意动画](/images/essays/github-for-agent-users/s2_branch.gif)
*图 2　分支与合并示意动画（作者用代码制作，仅作示意）*

**四、拉取请求（Pull Request，简称 PR）= 交作业 + 验收单**

GitHub 文档把整套流程概括为：建一个分支来做修改，提交以保存改动，开一个 PR 来提议和讨论这些改动，大家意见一致后再合并。

PR 会把你的分支和 `main` 放在一起对比，列出两个版本的差别：哪些文字删了、哪些是新加的。你不需要看懂每一行代码，只要能判断「这处改动是不是我要的」。

![示意动画](/images/essays/github-for-agent-users/s3_pr.gif)
*图 3　PR 改动对比示意动画（作者用代码制作，仅作示意）*

## Agent 和 GitHub 怎么配合

**第一种：本地存档。** 先把你电脑上的项目文件夹初始化成 Git 仓库（可以直接让 Agent 帮你执行 `git init`），之后每完成一轮让 Agent 提交一次，改坏了就让它退回。这是最省事、也最该先养成的习惯。

**第二种：Codex 云端交 PR。** 在 ChatGPT 里连接 GitHub 时，会跳转到 GitHub 安装并授权 ChatGPT 应用，再选择它能访问哪些仓库。要分清两件事：ChatGPT 里的 GitHub 应用只能读取仓库、用来分析和搜索；要生成、修改并推送到 GitHub，官方让你用 Codex。

Codex 交了 PR 之后，你可以直接在 PR 的评论里写 `@codex`，加上你要它做的事。官方文档说，它会以这个 PR 为上下文开始工作，在有权限时把修复推回原来的分支。

![示意动画](/images/essays/github-for-agent-users/s4_loop.gif)
*图 4　交 PR、留言、修改、合并的循环示意动画（作者用代码制作，仅作示意）*

**第三种：在 GitHub 上直接派活。** GitHub 自家的 Copilot 也有类似的智能体：把一个 issue（任务单）指派给 Copilot，它会规划工作、开 PR、写代码、跑测试，然后请你审查。已经在用 Codex 的人不必再装一套，知道有这条路就行。

## 动手一次：照着官方 Hello World 走

GitHub 官方的 Hello World 教程全程在网页上完成，五步：

1. 新建一个仓库，名字叫 `hello-world`，选择公开或私有，勾选「Add a README file」。
2. 从 `main` 拉出一个新分支，教程里叫 `readme-edits`。
3. 在新分支上打开 `README.md` 改几句，点「Commit changes」提交。
4. 开一个 PR，选择新分支和 `main` 对比，看看两个版本差在哪。
5. 合并 PR，删除用完的分支。

走完一遍，四个词你就都亲手用过了。

费用方面：GitHub 个人免费账号可以和不限数量的协作者一起，使用不限数量的公开仓库（功能完整）和不限数量的私有仓库（功能有所精简）。

## 我的判断

以下是我基于上面材料的归纳，不是官方结论：

1. **Agent 用得越多，越需要版本管理。** Agent 一次能改很多处，人很难靠记忆还原；提交记录替你记住每一步。
2. **白领的核心技能是「验收」，不是「编写」。** PR 把 Agent 的产出摊开给你看，判断要不要合并，这件事 Agent 替代不了你。
3. **不是什么都要上 GitHub。** 一次性的小活、用完就丢的文件，没必要折腾；需要反复修改、多人协作、或者交给 Agent 长期维护的项目，才值得建仓库。

## 还要提醒的

- 公司资料先确认规定，再决定能不能放上去；练手用私有仓库。
- Codex 云端和 GitHub 连接的可用范围，跟你的 ChatGPT 计划和工作区设置有关，以官方页面为准。
- 文中关于 `codex exec` 的行为来自第三方实测，只针对命令行模式。

