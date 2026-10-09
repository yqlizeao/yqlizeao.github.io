---
title: Shader 实时渲染效果展厅
collection:
  profile: wiki
  id: shader-gallery
tagline: 汇聚布料模拟、倒影、全息、溶解、描边等十余种常见游戏 Shader 特效展示
---

{% box 展厅导览 %}
本展厅沉淀了个人在 Unity 与游戏引擎开发过程中编写的实时 Shader 渲染特效。
涵盖顶点动画、屏幕坐标运算、纹理扰动、菲涅尔效应、模板测试与流光渲染。
{% endbox %}

## 在线实时演示

使用 Unity WebGL 构建的实时着色器演示项目已在线部署：

👉 [点击在线体验 MainSequenceStar 着色器演示](https://yqlizeao.github.io/MainSequenceStar-UnityShader/MainSequenceStar/index.html) *(建议使用 PC 浏览器打开)*

---

## 核心着色器效果集锦

点击下方任意预览图可启动画廊高清灯箱查看动效细节。

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

## 技术实现要点一览

| 特效名称 | 核心技术关键词 | 实现机制简述 |
| :--- | :--- | :--- |
| **简易布料模拟** | `GPU Gem 3 旌旗算法` · `三角函数` | 顶点着色器中通过 `sin` 周期叠加与权重控制实现顶点动画 |
| **暗黑3 翅膀** | `LineRenderer` · `UV 动画` · `发光叠加` | 动态 UV 扰动与加色混合模拟高能量能量体 |
| **定向溶解 (Dissolve)** | `Alpha Test` · `噪声纹理采样` · `边缘发光` | 噪声图 `tex2D` 灰度值阈值丢弃，过渡区间计算高亮烧焦边缘 |
| **力场护盾 (ForceField)** | `Fresnel` · `深度图采样 (SceneDepth)` | 视线与法线夹角菲涅尔边缘光，叠加相交处深度差检测边缘发光 |
| **全息投影与电磁干扰** | `Screen Space UV` · `噪声扫描线` | 在屏幕空间沿 Y 轴进行高频扫描线抖动与颜色通道错位 |
{% box 深入阅读 %}
如需查看完整的数学公式推导与对应着色器源码分析，请参阅博客深度长文：
* [《Shader 特效展览与技术沉淀》](/2017/10/16/2017-10-16-ShaderEffect/)
* [《【Shader】三种 Diffuse 漫反射光照模型对比与实现》](/2017/10/16/2017-10-16-%E3%80%90Shader%E3%80%91%E4%B8%89%E7%A7%8DDiffuse%E4%BB%8B%E7%BB%8D/)
* [《【Shader】三种 Specular 高光模型数学原理与实现》](/2017/10/17/2017-10-17-%E3%80%90Shader%E3%80%91%E4%B8%89%E4%B8%ADSpecular%E4%BB%8B%E7%BB%8D/)
{% endbox %}
