---
title: Figma AI 设计助手
description: Figma 插件，在设计流程中嵌入 AI 能力，支持智能布局建议和设计规范检查
tags: ["AI/设计", "Figma 插件", "TypeScript"]
featured: false
date: 2024-09-25
repoUrl: "https://github.com/marovole/figma-ai-plugin"
---

## 项目动机

作为产品经理，我经常需要和设计师紧密协作。这个插件帮助设计师更快地实现我的需求描述。

## 功能特性

### 文本到设计
输入产品需求描述，AI 自动生成初步的 UI 布局建议。

### 设计规范检查
自动检测设计稿中的不一致问题，如间距、颜色、字体等。

### 组件推荐
根据页面内容智能推荐可复用的设计组件。

## 技术实现

```typescript
// Figma 插件核心逻辑
figma.showUI(__html__, { width: 400, height: 600 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate-layout') {
    const layout = await generateLayout(msg.prompt);
    createFrameFromLayout(layout);
  }
};
```

## 效果

设计团队反馈，使用插件后设计初稿产出速度提升 40%。
