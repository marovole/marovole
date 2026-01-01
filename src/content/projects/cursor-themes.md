---
title: Cursor 主题生成器
description: 一款 AI 驱动的主题生成工具，可以根据用户描述自动生成符合 Cursor 设计语言的编辑器主题
tags: ["AI/LLM", "Vibe Coding", "前端开发"]
featured: true
date: 2024-11-15
demoUrl: "https://cursor-themes.example.com"
repoUrl: "https://github.com/marovole/cursor-themes"
---

## 项目背景

作为每天使用 Cursor 超过 8 小时的重度用户，我发现很难找到符合个人品味的主题。于是决定用 AI 来解决这个问题。

## 技术实现

使用 Claude API 分析用户描述的色彩偏好，结合色彩理论算法生成和谐的主题配色。

```typescript
// 主题生成核心算法
function generateTheme(prompt: string) {
  const analysis = await analyzeColorPreference(prompt);
  return createHarmoniousPalette(analysis);
}
```

## 用户反馈

上线一周内获得 500+ Star，用户普遍反馈生成的主题比手动调整的更加和谐美观。

## 下一步计划

- 支持 VS Code、JetBrains 等更多编辑器
- 添加社区分享功能
}
