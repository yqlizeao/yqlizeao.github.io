# 文档编写规范与工作指南 (AGENTS.md)

本文件为自动化智能体（Agents）及协作者在维护本博客时的架构设计、内容撰写、排版优化与工程规范指南。

---

## 1. 站点架构与定位

* **框架与主题**：Hexo 8.x + Stellar 2.0
* **核心内容定位**：游戏开发（Game Development）、实时渲染管线、Shader 着色器技术、Unity / Unreal 引擎开发、计算机图形学。
* **文件存储规则**：
  * **文章目录**：所有博文存放在 `source/_posts/`
  * **知识库内容**：Wiki 文档存放在 `source/wiki/<项目id>/`
  * **数据与集合配置**：存放在 `source/_data/`（如 `wiki.yml`, `wiki/*.yml`, `widgets.yml`）
  * **媒体资源**：图片存放在 `source/img/`（严禁将外部软件安装包、大体积压缩包作为网盘上传至此；PDF 教材统一放入 `source/img/pdf/`）

---

## 2. 三大多维集合系统规范 (Collections Architecture)

Stellar v2 将站点划分为 **博客（Post）**、**知识库（Wiki）**、**专栏（Topic）** 与 **笔记本（Notebook）** 四大系统，不得混淆各自的定位与配置层级。

### (1) Wiki 知识库系统（面向结构化项目与手册）
* **书架配置文件**：`source/_data/wiki.yml`
  * 声明上架项目的 ID 列表（必须是数组）：
    ```yaml
    - shader-gallery
    - graphics-study
    ```
* **项目描述文件**：`source/_data/wiki/<id>.yml`
  * 必须包含字段：`name`, `route.path: /wiki/<id>/`, `navigation.tree`
  * **专属 WebGL 2 原生视差 Hero 巨幕**（仅用于 Wiki 首页）：
    * 支持 4 种硬件加速特效：
      * `strands`：高饱和流动发光丝带，支持叠加毛玻璃折射（`glass: true`）。
      * `ferrofluid`：磁流体流光，带鼠标磁性引力交互。
      * `galaxy`：星空银河纵深穿越，带星点闪烁与排斥力场。
      * `light-rays`：跟随鼠标角度流转的丁达尔圣光光束。
    * 终端交互预览：`hero.preview.type: terminal`，配合 `commands: [{label: '...', codes: '...'}]`
    * 快捷操作按钮：`hero.actions: [{title: '...', url: '...', icon: '...'}]`
* **Wiki 页面路径**：`source/wiki/<id>/index.md`，并在 Front Matter 中声明：
  ```yaml
  ---
  title: 项目首页
  collection:
    profile: wiki
    id: <id>
  ---
  ```

### (2) Topic 专栏系统（面向系列化深度文章）
* **专栏列表文件**：`source/_data/topic.yml`（通过 `publish_list: [<id>]` 声明展示名单）。
* **专栏配置文件**：`source/_data/topic/<id>.yml`（支持 `route.start` 指定入口文章，支持 `listing.sort` 排序）。
* **专栏文章归属**：文章仍然存放在 `source/_posts/` 中，通过 Front Matter 声明：
  ```yaml
  ---
  title: 专栏第一讲
  collection:
    profile: topic
    id: <id>
  ---
  ```

### (3) Notebook 笔记本系统（面向碎片化多级标签笔记）
* **配置文件**：`source/_data/notebooks/<id>.yml`。
* **特性**：不设静态目录树，自动通过带有斜杠的层级标签生成标签树（如 `tags: [unity/rendering/urp, shader/hlsl]`）。

---

## 3. 标准 Front-Matter 元数据全景规范

每篇 Markdown 开头必须包含规范且语义完整的 Front-matter。字段统一使用 `snake_case`：

### (1) 完整字段字典与取值范围

| 字段 | 类型 | 说明与合法取值 | 适用范围 |
| :--- | :--- | :--- | :--- |
| `title` | string | 文章或页面标题 | 全部 |
| `date` | string / date | 发布时间（格式：`YYYY-MM-DD HH:mm:ss`） | 全部 |
| `cover` | string | 封面图片（必须为绝对相对路径 `/img/...`，供卡片与横幅共用） | 全部 |
| `tagline` | string | 卡片底部一句话说明（展示于列表卡片与 Hero 摘要中） | 全部 |
| `tags` | string array | 标签数组 | 全部 |
| `categories` | string array | 分类数组（统一顶层分类） | Post |
| `collection.profile` | string | 集合类型：`wiki` / `topic` / `notebook` | 集合成员 |
| `collection.id` | string | 对应的集合配置文件名（不带扩展名） | 集合成员 |
| `listing.priority` | number | **置顶优先级**（正整数生效，越大越靠前；0 不置顶） | Post, Topic, Notebook (Wiki 不支持) |
| `banner.enabled` | boolean | 内容页顶部横幅开关（`false` 隐藏整块横幅） | 全部内容页 |
| `banner.background` | boolean | 是否以页面 `cover` 作为横幅背景（`false` 使用纯色） | 全部内容页 |
| `article.style` | string | 排版风格：`tech`（科技紧凑）/ `story`（长文故事） | 全部内容页 |
| `article.author` | string | 对应 `authors.yml` 中的作者 ID | 全部内容页 |
| `article.ai_label` | string | AI 标注：`manual` / `reviewed` / `polished` / `generated` | 全部内容页 |
| `source.repository` | string | 关联的 GitHub 仓库（格式：`owner/repo`，驱动 Star/Fork 组件） | 全部内容页 |
| `visibility.listed` | boolean | 是否在列表和 Recent 组件中可见（默认 `true`） | 全部内容页 |
| `visibility.searchable`| boolean | 是否被本地/Algolia 搜索索引（默认 `true`） | 全部内容页 |
| `footer.references` | string array | 参考资料列表（**必须为 Markdown 字符串数组**） | 全部内容页 |
| `footer.license` | string/bool | 独立授权声明（`false` 关闭，`true` 恢复全局） | 全部内容页 |
| `footer.share` | array/bool | 分享服务列表（`qrcode`, `weibo`, `x`, `telegram`, `email` 等；`false` 关闭）| 全部内容页 |
| `render.math` | string/bool | 公式渲染：`false` / `katex` / `mathjax` | 全部内容页 |
| `render.diagrams` | string/bool | 流程图渲染：`false` / `mermaid` | 全部内容页 |

### (2) 博客博文推荐模版

```yaml
---
title: 文章标题
date: 2026-10-09 10:00:00
cover: /img/article-title/封面图.jpg
tags:
  - Shader
  - Unity3D
categories:
  - 渲染与特效
tagline: 简明扼要的一句话技术摘要
listing:
  priority: 0  # 核心精华设为 1 或 2，自动在首页触发 3D Spotlight/Tilt 置顶轮播
article:
  style: tech
  ai_label: manual
footer:
  references:
    - '[Unity 官方文档](https://docs.unity.com/)'
    - '[GPU Gems 3 旌旗算法](https://developer.nvidia.com/gpugems/gpugems3/)'
---
```

---

## 4. Stellar 原生标签插件全集 (Tag Plugins Matrix)

Stellar v2 内置了大量高性能、开箱即用的专业排版标签组件，严禁在正文中退化为单一的纯文本平铺。

### (1) 容器类组件 (Container Tags)
* **多行彩色高亮盒（`box`）**：
  * 语法：`{% box [color:颜色] [child:codeblock/tabs] 标题 %} 正文内容 {% endbox %}`
  * 颜色取值：`red`, `orange`, `amber`, `yellow`, `green`, `cyan`, `blue`, `purple`, `light`, `dark`, `warning`, `error`。
* **选项卡对比（`tabs`）**：
  * 语法：
    ```markdown
    {% tabs compare_name, 1 %}
    <!-- tab 方案一 -->
    方案一代码与说明
    <!-- tab 方案二 -->
    方案二代码与说明
    {% endtabs %}
    ```
* **自适应瀑布流画廊（`gallery`）**：
  * 语法：
    ```markdown
    {% gallery size:m aspect_ratio:original %}
    ![](/img/path/demo1.gif)
    ![](/img/path/demo2.gif)
    {% endgallery %}
    ```
  * 参数：`size`（`s`, `m`, `l`, `xl`, `mix`），`aspect_ratio`（`square`, `original`, `portrait`）。自动集成 Fancybox 灯箱放大。
* **自适应多列网格（`grid`）**：
  * 语法：`{% grid c:2 %} <!-- cell --> 卡片1 <!-- cell --> 卡片2 {% endgrid %}`
* **手风琴折叠块（`folding`）**：
  * 语法：`{% folding 标题 open:false %} 折叠内容 {% endfolding %}`
* **古典/诗词/纸张排版**：
  * `{% poetry 标题 author:作者 footer:出处 %} 诗句 {% endpoetry %}`
  * `{% paper style:underline title:标题 author:作者 %} 正文 {% endpaper %}`
  * `{% reel 标题 author:作者 %} 正文 {% endreel %}`

### (2) 表达类组件 (Expressive Tags)
* **单行彩色提示（`note`）**：`{% note [color:cyan] [标题] 简短提示文字 %}`（注意：`note` 是单行标签，不可使用 `endnote`；多行请用 `box`）。
* **词句气泡注解（`tip`）**：`{% tip 划重点 pop:"桌面端悬浮、移动端点击展示的注解" %}`
* **居中引用金句（`quot`）**：`{% quot 核心定律或结论 icon:hashtag %}`
* **立体动作按钮（`button`）**：`{% button 立即体验 https://example.com/ icon:default:play color:theme %}`
* **一键复制命令行（`copy`）**：`{% copy git clone https://github.com/... prefix:$ %}`
* **外链富卡片（`link`）**：`{% link https://github.com/ "项目名称" desc:true %}`
* **彩色交互复选框（`checkbox`）**：`{% checkbox checked:true color:green symbol:plus 任务已完成 %}`
* **影音播放器**：
  * 音乐：`{% audio https://example.com/audio.mp3 %}` 或 `{% audio netease:歌曲ID %}`
  * 视频：`{% video bilibili:BV号 width:100% %}` 或 `{% video youtube:视频ID %}`
* **设备与聊天拟真**：
  * 对话模拟：`{% chat iphone11 style:wechat me:me %} ... {% endchat %}`
  * 设备外框：`{% frame iphone11 img:演示图.png video:演示视频.mp4 focus:top %}`
* **行内文本修饰**：
  * 高斯模糊剧透：`{% blur 核心技术底牌 %}`
  * 密码遮罩：`{% psw 密钥文字 %}`
  * 快捷键微章：`{% kbd Ctrl %} + {% kbd Shift %} + {% kbd P %}`
  * 着重号：`{% emp 关键术语 %}`，波浪线：`{% wavy 警告内容 %}`

### (3) 数据类组件 (Data Tags)
* **时间线（`timeline`）**：
  * 静态时间线：`{% timeline %} <!-- node 2026-10-09 --> 节点事件 {% endtimeline %}`
  * 动态数据（支持 GitHub Issue / RSS / Memos / Weibo / 评论）：`{% timeline api:URL type:rss limit:5 %}{% endtimeline %}`
* **GitHub 动态卡片（`ghcard`）**：`{% ghcard owner/repo theme:dark %}`（自动展示实时 Star/Fork 与语言分布）。
* **远程 Markdown 就地加载（`md`）**：`{% md https://raw.github.../README.md wrap:false %}`（无缝融入当前页面）。

---

## 5. Widget 挂件库与布局系统 (Widgets & Layout)

### (1) 放置区域与位置规则
* **Topbar**：支持 `menu`, `settings`, `spacer`, `toc`。
* **Leftbar**：
  * 固定区域（不应写入 `leftbar.widgets`）：Brand（头像与站点名）、Menu（固定主菜单）、Footer Actions（底部操作栏）、Settings（外观设置）。
  * 内容挂件区（`leftbar.widgets`）：支持 `toc`, `tree`, `tagtree`, `recent`, `related`, `ghrepo`, `ghissues`, `ghuser`, `author`, `tagcloud`, `markdown`, `linklist`, `timeline`。
* **Rightbar**：文章页与 Wiki 页面常驻 `toc` 与 `ghrepo`。

### (2) 挂件调用与覆盖语法
在 `_config.stellar.yml` 或页面 Front Matter 的 `widgets` 列表中支持 3 种写法：
1. **直接引用已注册实例**：`- toc` 或 `- recent`
2. **重载参数实例**：
   ```yaml
   - override: toc
     max_depth: 3
     collapse: true
   ```
3. **页面级匿名实例**：
   ```yaml
   - layout: markdown
     title: 温馨提示
     content: 本文内容受专利与版权保护。
   ```

---

## 6. 配置层级继承模型与定制规范 (Cascading Rules)

### (1) 级联覆盖优先级
配置按以下顺序逐级覆盖，越靠后优先级越高：
$$\text{主题全局配置 (\_config.stellar.yml)} \longrightarrow \text{页面类型 Profile (profiles.*)} \longrightarrow \text{集合配置 (\_data/*/*.yml)} \longrightarrow \text{页面 Front Matter}$$

* **对象合并**：保留未覆盖字段。
* **数组替换**：**数组整体替换**，明确写出 `[]` 表示清空内容（例如 `widgets: []` 表示清空该区域）。省略则表示继承上级。

### (2) 自定义 CSS 与样式注入规范
* 严禁直接篡改 `node_modules/` 源码。
* 自定义样式统一放在 `source/assets/custom.css`。
* 在 `_config.stellar.yml` 中通过注入引入：
  ```yaml
  inject:
    head_end: '<link rel="stylesheet" href="/assets/custom.css">'
  ```

---

## 7. 历史手写文档重构经验与避坑指南 (Lessons Learned)

在翻新历史 Markdown 文档与新增页面时，必须遵守以下铁律：

### (1) 换行符 Windows CRLF 陷阱
* **底层限制**：`hexo-front-matter` 切分 Front Matter 时的内置正则要求 `\n`（Unix LF）。如果在 Windows 下生成了 `\r\n`（CRLF），会导致元数据解析失败，整篇 Front Matter 会被作为正文渲染。
* **铁律**：所有 Markdown、YAML 文件必须保存为 **UTF-8 LF**。

### (2) 清理陈旧 HTML 标签与废弃字段
* **剔除 `<br>`**：标准 Markdown 段落之间空一行即可换行，禁止在正文中遗留手写 `<br>`。
* **严禁废弃 Front Matter 字段**：
  * 禁：`layout: single`、`catalog: true`（Stellar 会报错或警告）。
  * 禁：顶层 `author`（应使用 `article.author`）。
  * 禁：顶层 `sticky: 1`（置顶已统一迁移为 `listing.priority: 1`）。
  * 禁：`{% endnote %}`（`note` 是单行标签，闭合标签是 `endbox`）。

### (3) 中英文混排与间距（盘古之白）
* 中文字符与英文字母/数字之间必须保留一个半角空格，例如：`Unity Shader 编写`（而非 `UnityShader编写`）、`2026 年 10 月`（而非 `2026年10月`）。
* 英文标点后跟空格，中文标点保持全角。

### (4) 链接健壮性与本地化优先
* 仓库本地已存有对应资产时（如 `source/img/pdf/` 目录下的思维导图和经典教材），必须优先使用本地相对链接（例如 `[PDF 阅读](/img/pdf/MindMapping/xxx.pdf)`）。
* 文章内部互链应使用网站根相对路径（例如 `[跳转](/2017/10/16/2017-10-16-ShaderEffect/)`），严禁使用外部写死的测试域名。
* 任何图片引用路径必须以 `/img/` 开头，严禁使用缺少前导斜杠的 `img/...`。

---

## 8. 提交前验证流程 (Verification Workflow)

每次新增、编辑博文或调整主题配置后，**必须**在终端执行以下检查以确保构建健全：

```bash
# 1. 运行主题健康检查（必须 PASS 且 0 Warning / 0 Error）
npx hexo stellar doctor

# 2. 模拟静态全量构建（确保无断链、无图片元数据缺失错误）
npx hexo clean && npx hexo generate
```
