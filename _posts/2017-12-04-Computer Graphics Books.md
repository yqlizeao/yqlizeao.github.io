---
published: true
layout: post
title: ComputerGraphicsBooks
date: 2017-12-4 17:14:07
author: Leo
header-img: img/article-title/ComputerGraphicsBooks.jpg
tags:
  - Books
---
> Introduction<br>
> Geometry Processing<br>
> Rendering<br>
> Animation and Simulation<br>
> Mathematics<br>
> Toolchain<br>

### 转自[知乎](https://zhuanlan.zhihu.com/p/27158983)

## Introduction
> Interactive computer graphics : a top-down approach with shader-based OpenGL / Edward Angel et al.

相当不错的图形学入门读物，偏重实时渲染。用OpenGL（新版本为WebGL）作为教学，简单容易上手。
[PDF](http://note.youdao.com/noteshare?id=482ea40fb5db35456bf90345a3dfa0ed&sub=E6D3AC450DE8495482D62A16256F9431)

> The Art of 3D Computer Animation and Effects by Isaac V. Kerlow

全面介绍电影/动画工业的方方面面，由迪斯尼工作人员攒书，值得一看。没有找到资源，京东有售570RMB，等我找到资源再来填坑。

## Geometry Processing几何处理
> Computational Geometry: Algorithms and Applications. Third Edition. Mark de Berg, et al

计算几何经典之作，深入浅出，例子很多，每一章开头都有本章内容的实际应用，书后附有大量习题。
[PDF](http://note.youdao.com/noteshare?id=482ea40fb5db35456bf90345a3dfa0ed&sub=E6D3AC450DE8495482D62A16256F9431)

> Polygon mesh processing. CRC press. Botsch et al. 2010

包括基本的几何形体处理算法的讲解，比如平滑降噪、参数化、三角剖分、简化与近似、形变等。
[PDF](http://note.youdao.com/noteshare?id=482ea40fb5db35456bf90345a3dfa0ed&sub=E6D3AC450DE8495482D62A16256F9431)

> Discrete Differential Geometry: An Applied Introduction. Keenan Crane 2015

讲述传统微分几何的基本概念如何在离散计算中得到应用，同时也会涉及到对一些相关数学工具的应用的探讨。内容主要包括曲率、平行转移、外蕴代数和微积分、拓扑、霍奇分解、保角映射、有限元方法等。
[PDF](http://note.youdao.com/noteshare?id=482ea40fb5db35456bf90345a3dfa0ed&sub=E6D3AC450DE8495482D62A16256F9431)

> Vector Field Processing on Triangle Meshes. Fernando de Goes et al. 2015

讲述如何在几何体表面的切空间定义向量场并应用到对几何形体的处理中。本文也着重讲解了如何将传统微分几何的概念离散化到三角形网格上，选取三角形、顶点、边作为离散元分别有何优缺点。
[PDF](http://note.youdao.com/noteshare?id=482ea40fb5db35456bf90345a3dfa0ed&sub=E6D3AC450DE8495482D62A16256F9431)

## Rendering
> Physically Based Rendering, From Theory to Implementation /Matt Pharr

讲解详细体系完备，更难能可贵的是本书配套一个渲染系统，书后习题提供了参考文献和思路来改进这个渲染系统，学练结合，夫复何求？
[PDF](http://note.youdao.com/noteshare?id=482ea40fb5db35456bf90345a3dfa0ed&sub=E6D3AC450DE8495482D62A16256F9431)

> Real-Time Rendering, Tomas Akenine-Moller, Eric Haines & Naty Hoffman

与离线渲染相对应的实时渲染经典著作，针对现代图形渲染管线、GPU、着色器等有详细讲解。同时总结了大量游戏开发中非常实用的算法。
[浅墨CSDN](http://blog.csdn.net/poem_qianmo)

## Animation and Simulation动画和模拟
> Fluid simulation for computer graphics / Robert Bridson

作者流体模拟届大牛Bridson，从NS方程的推导入手，详细介绍流体模拟的经典算法，是做物理模拟方向的同学几乎人手一本的参考书。
[PDF](http://note.youdao.com/noteshare?id=482ea40fb5db35456bf90345a3dfa0ed&sub=E6D3AC450DE8495482D62A16256F9431)

> Nonlinear Continuum Mechanics for Finite Element Analysis / Javier Bonet & Richard D. Wood

固体、软体模拟、声音合成等方向的必读物。从最简单的线性机械学介绍到非线性机械学，对各种应力模型都有详细的介绍。同时对不同机械学模型的有限元分析也进行了深入的讲解。
[PDF](http://note.youdao.com/noteshare?id=482ea40fb5db35456bf90345a3dfa0ed&sub=E6D3AC450DE8495482D62A16256F9431)

> Boundary Element Method / Stefan A. Sauter & Christoph Schwab

本书详细介绍了边界元方法的理论和具体的数值方法。从边界元的概念、伽辽金方法等，讲述到椭圆边界积分方程的性质和解法，之后详细介绍了边界元方法及其在不同应用下的各种变通方法，最后也介绍了一些相关的线性方程求解和误差分析方法。
[PDF](http://note.youdao.com/noteshare?id=482ea40fb5db35456bf90345a3dfa0ed&sub=E6D3AC450DE8495482D62A16256F9431)

> Rigid Body Simulation I & II / David Baraff

刚体模拟的入门读物，从最基本的刚体运动方程讲到刚体碰撞等。作者是皮克斯动画工作室的高级研究员，其开发的布料模拟算法已被广泛采纳于各种游戏和特效引擎中。

> The Arts of Fluid Animation / Jos Stam CRC Press

Jos Stam讲得很有趣，可以作为引起兴趣的一本入门书籍，还带他的经典代码。
[PDF](http://note.youdao.com/noteshare?id=482ea40fb5db35456bf90345a3dfa0ed&sub=E6D3AC450DE8495482D62A16256F9431)

> [Fluid Simulation for Video Games](https://software.intel.com/en-us/articles/fluid-simulation-for-video-games-part-1/)

今天在办公室整理资料的时候发现当时一开始学习流体的时候看得很起劲的一个系列教程，叫Fluid Simulation for Video Games （因为我以前是做Game dev的，但后来兴趣有所改变…），这个系列提供很多关于流体的信息，但都不是那种看了作呕的教科书，它还提供一些源码可以玩。

## Mathematics & Toolchain工具链
去原链里面看去