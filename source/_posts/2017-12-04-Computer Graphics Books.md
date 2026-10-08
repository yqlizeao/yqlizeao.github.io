---
title: 计算机图形学经典书单与导读
date: 2017-12-04 17:14:07
cover: /img/article-title/ComputerGraphicsBooks.jpg
tags:
  - 图形学
  - 读书笔记
categories:
  - 计算机图形学
tagline: 涵盖入门导论、几何处理、离线与实时渲染、动画流体模拟的经典图书清单与导读
---

> **图形学进阶书单导览**  
> 涵盖：入门导论 · 几何处理 · 渲染算法 · 动画与物理模拟 · 数学基础 · 实用工具链  
> *(部分书目整理自网络与个人研读精选)*

---

## 1. Introduction 入门导论

* **《Interactive Computer Graphics: A Top-Down Approach with Shader-Based OpenGL》**  
  *作者：Edward Angel / Dave Shreiner*  
  相当不错的图形学入门读物，偏重实时渲染。使用 OpenGL（新版为 WebGL）作为教学主线，简单直观易上手。  
  📄 [本地 PDF 在线阅读](/img/pdf/ComputerGraphicsBooks/Pearson.Interactive.Computer.Graphics.A.Top-Down.Approach.with.WebGL.7th.Edition.0133574849.pdf)

* **《The Art of 3D Computer Animation and Effects》**  
  *作者：Isaac V. Kerlow*  
  全面介绍电影与动画工业视效制作的方方面面，由迪士尼一线技术团队编写，极具行业视野。

---

## 2. Geometry Processing 几何处理

* **《Computational Geometry: Algorithms and Applications》**  
  *作者：Mark de Berg 等*  
  计算几何领域的经典之作，深入浅出、图例详实。每一章开头均紧密结合实际工程应用，书后附有丰富的理论与编程习题。  
  📄 [本地 PDF 在线阅读](/img/pdf/ComputerGraphicsBooks/Computational%20Geometry%20Algorithms%20and%20Applications.pdf)

* **《Polygon Mesh Processing》**  
  *作者：Mario Botsch 等 (CRC Press)*  
  系统讲解多边形网格几何形体处理算法：平滑降噪、网格参数化、Delaunay 三角剖分、网格简化、近似重建与形变控制。

* **《Discrete Differential Geometry: An Applied Introduction》**  
  *作者：Keenan Crane*  
  讲述传统微分几何的基本数学概念如何在离散计算机网格中落地应用。内容涵盖曲率、平行移动、外蕴代数与微积分、拓扑流形、保角映射与有限元方法。

* **《Vector Field Processing on Triangle Meshes》**  
  *作者：Fernando de Goes 等*  
  讲述如何在几何体表面的切空间中定义连续与离散向量场，并应用到几何纹理流动与曲面形变处理中。

---

## 3. Rendering 渲染技术

* **《Physically Based Rendering: From Theory to Implementation (PBRT)》**  
  *作者：Matt Pharr, Wenzel Jakob, Greg Humphreys*  
  离线基于物理渲染领域的“圣经”。体系完备、推导严密，配套完整的开源 PBRT 渲染器。结合代码学练结合，渲染方向必读书目。

* **《Real-Time Rendering (RTR)》**  
  *作者：Tomas Akenine-Möller, Eric Haines, Naty Hoffman*  
  现代实时渲染工业不可替代的百科全书。全面覆盖现代 GPU 硬件架构、可编程渲染管线、阴影贴图、全局光照近似算法及多项工业级游戏渲染技术。

---

## 4. Animation & Simulation 动画与模拟

* **《Fluid Simulation for Computer Graphics》**  
  *作者：Robert Bridson*  
  流体模拟泰斗级专著。从 Navier-Stokes 方程的严密物理推导切入，循序渐进介绍网格法、质点网格法（PIC/FLIP）等流体经典模拟算法，物理模拟方向人手一本的必备参考书。

---

## 5. Mathematics 数学基础

* **《3D Math Primer for Games and Graphics Development》**  
  *作者：Fletcher Dunn, Ian Parberry*  
  专为游戏与图形开发者量身定制的数学基础书。涵盖坐标系变换、向量几何、矩阵运算、四元数旋转插值与碰撞几何检测。

* **《Mathematics for 3D Game Programming and Computer Graphics》**  
  *作者：Eric Lengyel*  
  进阶数学宝典。深入探讨投影矩阵推导、光线追踪射线相交检测、曲线曲面生成与多边形 BSP 空间分割。

---

## 6. Toolchain & Shader 实战

* **《Unity Shader 入门精要》**  
  *作者：冯乐乐*  
  国内 Unity 开发者最友好的 Shader 入门指南，直观易读。  
  📄 [本地阅读：第四章数学基础 PDF](/img/pdf/ComputerGraphicsBooks/Unity%20Shader入门精要-数学基础.pdf) · [本地完整书目 PDF](/img/pdf/ComputerGraphicsBooks/Unity%20Shader入门精要.pdf)

* **《Unity Shader 编程》**  
  行文更偏向有经验程序员的思维习惯，条理清晰、轻快实用。  
  📄 [本地 PDF 在线阅读](/img/pdf/ComputerGraphicsBooks/Unity%20Shader编程.pdf)

* **《OpenGL Programming Guide (红宝书)》 & 《OpenGL SuperBible (蓝宝书)》**  
  现代图形 API 经典权威指南。
