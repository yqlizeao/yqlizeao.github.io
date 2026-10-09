---
title: Shader 特效展览与技术沉淀
date: 2017-10-16 17:29:07
cover: /img/article-title/shadereffect.png
tags:
  - 作品展览
  - Shader
  - Unity3D
categories:
  - 渲染与特效
tagline: 汇集布料模拟、倒影、全息、溶解、描边等十余种常见游戏 Shader 特效展示
listing:
  priority: 2
---

{% box 展厅简介 %}
**ShaderEffect 作品展**  
不定期更新，开源作品，随意使用。  
—— *By Leo*
{% endbox %}

{% gallery size:m aspect_ratio:original %}
![](/img/shader%20effect/Dissolve.gif)
![](/img/shader%20effect/ForceField.gif)
![](/img/shader%20effect/Wave.gif)
![](/img/shader%20effect/WindSimulate.gif)
![](/img/shader%20effect/diablo3%20wings.gif)
![](/img/shader%20effect/checkerboard%20pattern.gif)
![](/img/shader%20effect/全息投影.gif)
![](/img/shader%20effect/流光效果.gif)
![](/img/shader%20effect/透视边缘.gif)
![](/img/shader%20effect/通用流光.gif)
![](/img/shader%20effect/遮挡半透.gif)
![](/img/shader%20effect/电磁干扰.gif)
![](/img/shader%20effect/像素化.gif)
![](/img/shader%20effect/逐渐显示.gif)
![](/img/shader%20effect/reflection.gif)
![](/img/shader%20effect/grap.gif)
{% endgallery %}
---

### 1. MainSequenceStar 主序星

使用 Unity WebGL 构建的实时着色器演示：[在线体验链接](https://yqlizeao.github.io/MainSequenceStar-UnityShader/MainSequenceStar/index.html) *(建议使用 PC 浏览器打开，网页加载后稍作等待)*。

---

### 2. Unity 简易布料模拟

![](/img/shader%20effect/Wave.gif)
![](/img/shader%20effect/WindSimulate.gif)

* **核心关键词**：`ShadowGun 旌旗算法 (GPU Gem 3)` · `sin 周期三角函数` · `顶点动画`

---

### 3. 暗黑破坏神3 翅膀 (Diablo3 Wings)

![](/img/shader%20effect/diablo3%20wings.gif)

* **核心关键词**：`LineRenderer 线渲染器` · `UV 动画` · `发光叠加`

---

### 4. 棋盘格效果

![](/img/shader%20effect/checkerboard%20pattern.gif)

* **核心关键词**：`VPOS / SV_Position 屏幕坐标语义` · `步进函数`

---

### 5. 定向溶解 (Dissolve)

![](/img/shader%20effect/new%20login.gif)
![](/img/shader%20effect/Dissolve.gif)

* **核心关键词**：`clip() 裁剪测试` · `World Space 世界坐标判定` · `Noise 噪声纹理采样`

---

### 6. 两种水面倒影

![](/img/shader%20effect/grap.gif)
![](/img/shader%20effect/reflection.gif)

* **核心关键词**：`GrabPass 抓屏` · `Noise 扰动` · `线面相交投影` · `顶点波浪动画 (sin)`

---

### 7. 像素风格后处理

![](/img/shader%20effect/像素化.gif)

* **核心关键词**：`ImageEffect 后处理` · `DownSample 降采样像素映射`

---

### 8. 渐显效果

![](/img/shader%20effect/逐渐显示.gif)

* **核心关键词**：`clip()` · `sign()` · `saturate()` 阈值过渡截断

---

### 9. 投影假阴影 (Planar Shadow)

![](/img/shader%20effect/假shadow.png)

* **核心关键词**：`平面射线几何投影` · `线面相交矩阵`

---

### 10. 全息科技特效

![](/img/shader%20effect/全息投影.gif)
![](/img/shader%20effect/电磁干扰.gif)

* **核心关键词**：`顶点抖动动画` · `Fresnel 边缘光` · `frac()` 扫描线 · `step()` 条纹 · `sin()` 闪烁

---

### 11. 流光特效

![](/img/shader%20effect/流光效果.gif)
![](/img/shader%20effect/通用流光.gif)

* **核心关键词**：`UV 坐标偏移` · `流光贴图混合加色`

---

### 12. 护盾能量罩特效

![](/img/shader%20effect/ForceField.gif)

* **核心关键词**：`Camera Depth Texture 深度纹理交界计算` · `Rim Light 边缘光`

---

### 13. 建筑遮挡半透特效

![](/img/shader%20effect/遮挡半透.gif)

* **核心关键词**：`Raycast 射线检测` · `Collider 碰撞器` · `双 Pass 透明深度 Shader`

---

### 14. 人物遮挡透视边缘特效

![](/img/shader%20effect/透视边缘.gif)

* **核心关键词**：`ZTest Greater (深度测试逆向判断)` · `Rim 轮廓系数`

---

### 15. 人物描边轮廓效果

![](/img/shader%20effect/人物描边.png)

* **核心关键词**：`法线外扩挤出 (Vertex Extrusion)` · `Cull Front (正面向后剔除双 Pass)`
* **技术扩展**：描边的工程做法多样，详细可参考浅墨（毛星云）大神的《Real-Time Rendering 3rd》提炼总结第十一章《非真实感渲染(NPR)技术总结》以及冯乐乐关于 NPR 轮廓线渲染的综述探讨。
