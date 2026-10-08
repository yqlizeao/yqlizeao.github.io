# 文档编写规范与工作指南 (AGENTS.md)

本文件为自动化智能体（Agents）及协作者在维护本博客时的内容撰写与规范指南。

---

## 1. 站点架构与定位

* **框架与主题**：Hexo 8.x + Stellar 2.0
* **核心内容方向**：游戏开发（Game Development）、实时渲染管线、Shader 着色器编写、Unity / Unreal 引擎技术、计算机图形学。
* **文件存储规则**：
  * **文章目录**：所有博文存放在 `source/_posts/`
  * **媒体资源**：图片存放在 `source/img/`（严禁将外部软件安装包、大体积压缩包作为网盘上传至此）

---

## 2. 文章文件命名与元数据规范

### (1) 文件命名
* 推荐命名格式：`YYYY-MM-DD-英文或拼音短标题.md`（例如：`2026-10-08-unity-urp-custom-render-pass.md`）。
* 文件编码：**UTF-8**。
* 换行符：**LF**（避免使用 CRLF，防止主题元数据解析异常）。

### (2) 必须遵循的 Front-matter 模版

每篇 Markdown 开头必须包含规范的 Front-matter：

```yaml
---
title: 文章标题
date: 2026-10-08 15:00:00
cover: /img/封面图片.jpg
tags:
  - Shader
  - Unity3D
categories:
  - 图形渲染
tagline: 简短的一句话摘要（展示于列表卡片底部）
listing:
  priority: 0  # 置顶优先级，大于 0 为置顶，数字越大越靠前
---
```

### (3) 元数据注意事项
* **封面图（`cover`）**：路径必须以 `/img/` 开头，建议比例约 2:1 或 16:9。
* **摘要分割线**：可以在引言后插入 `<!-- more -->` 控制首页卡片预览字数。
* **废弃字段禁忌**：不要添加 `layout: single`、`catalog: true` 或顶层 `author` 字段（这些是旧主题遗留物，Stellar 会报错或警告）。

---

## 3. 内容与排版规范

1. **专注技术实质**：
   - 保持证据优先、内容扎实的技术博客风格。
   - 杜绝泛 AI 新闻搬运或空洞内容，文章需有具体的原理、代码、参数分析或工程实践。
2. **图片引用路径**：
   - 必须使用绝对相对路径，如 `![](/img/article/diffuse.png)`，严禁使用缺少前导斜杠的 `img/...`。
3. **代码块标记**：
   - 必须标注准确的语言标识符（如 `csharp`, `hlsl`, `glsl`, `cpp`, `python`, `yaml`, `bash`）。
4. **原生组件增强（Stellar Tag Plugins）**：
   - **重点提示**：使用 `{% note info 标题 %}内容{% endnote %}`（支持 `info`, `warning`, `error`）。
   - **多代码/方案对比**：使用 `{% tabs 标签名 %}`。
   - **长代码/折叠内容**：使用 `{% folding 展开标题 %}内容{% endfolding %}`。
   - **数学公式**：直接使用标准 LaTeX（`$E=mc^2$` 或 `$$公式$$`）。

---

## 4. 提交前验证流程

每次新增或编辑博文后，必须执行以下检查以确保构建健全：

```bash
# 1. 运行主题健康检查（必须 PASS 且 0 Warning）
npx hexo stellar doctor

# 2. 模拟静态构建（确保无断链、无图片元数据缺失错误）
npx hexo clean && npx hexo generate
```
