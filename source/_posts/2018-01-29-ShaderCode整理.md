---
title: Unity Shader 常用特效与光照代码索引
date: 2018-01-29 21:22:42
cover: /img/article-title/ShaderCode整理.jpg
tags:
  - ShaderCode
  - 代码索引
  - Unity3D
categories:
  - 渲染与特效
tagline: 系统化归纳建筑半透、角色流光、全息、棋盘、布料、光照模型与纹理动画的 Shader 源码清单
---

> **Shader 源码索引库**  
> 涵盖常用玩法特效、光照模型、纹理贴图、顶点动画、屏幕后处理与 NPR 非真实感渲染的核心代码归档。

---

## 1. 常用视觉与玩法特效

* 🏢 **建筑遮挡半透**：[Shader 源码链接](http://note.youdao.com/noteshare?id=501036160d5a0f6c4bd9de8a201dbf7f&sub=01443A40BF294D5898ABF473B0F3A17C)
* 👤 **人物渲染多合一（描边 + 边缘光 + 透视边缘 + 流光 + 渐显）**：[Shader 源码链接](http://note.youdao.com/noteshare?id=d2d57172e535daae7d8c4e844956b6bc&sub=68000B257C4F49EB93435B20021B3426)
* 🌐 **全息科技投影 (Hologram)**：[Shader 源码链接](http://note.youdao.com/noteshare?id=d0660407e4cbdbe0cfcc662c07873dea&sub=313177E97265494C897C9E10A5C4CBDC)
* 🛡️ **能量罩护盾 (Force Field)**：[Shader 源码链接](http://note.youdao.com/noteshare?id=b7a00c5d2c6b3b2ee0735e5ede605776&sub=21D59BC2416846D5ABBFB821D8856BDE)
* 👥 **平面投影假阴影 (Planar Shadow)**：[Shader 源码链接](http://note.youdao.com/noteshare?id=12b8a998cc398f7a1b2e6ee384538304&sub=0A307C223700444CB4D23ABAAE910A36)
* ✨ **UV 流光动画**：[Shader 源码链接](http://note.youdao.com/noteshare?id=36e3903e87e1d53251b58cd1e6eb1680&sub=DFC90FB6D85F438BBB7C16956B367A36)
* ⏳ **Cutoff 渐显消融过渡**：[Shader 源码链接](http://note.youdao.com/noteshare?id=b5453ceb3a1b0c92e8efefa44318034e&sub=25BC103C9BE34C4D9B6C28C076081687)
* 🔥 **Cutoff 边缘带光溶解**：[Shader 源码链接](http://note.youdao.com/noteshare?id=96672bb317f4dc84fde4a5ee4c4d3ca8&sub=EC8E9461BF174BF6866E590703DD868F)
* 🏁 **屏幕空间棋盘格效果**：[Shader 源码链接](http://note.youdao.com/noteshare?id=5c78b3b4928aed5165968a2f4abd969d&sub=E84C6F11222A4237946BCC1263A62E13)
* 📖 **翻页书本效果 (FlipBook)**：[Shader 源码链接](http://note.youdao.com/noteshare?id=77f3a745f8b31264d77c8b7a6774d4f1&sub=F0A8E9A4447441FB945976B2578AF72C)
* 🪽 **暗黑3光翼特效 (Diablo3 Wings)**：[Shader 源码链接](http://note.youdao.com/noteshare?id=b6824b863292328f4c32a6bff82f5768&sub=C61F85A03E154AF0BBEF5F39E1D4548A)
* 🚩 **风吹布料简易顶点模拟**：[Shader 源码链接](http://note.youdao.com/noteshare?id=d50a8cf98a3b13dc66db7977cee02767&sub=E6A47CB5A9E142D1B563442C7344CDEF)
* 🌊 **Flowmap 贴图流动导向控制**：[Shader 源码链接](http://note.youdao.com/noteshare?id=12cf504f841972993dac120a02b3a4de&sub=0EED2A812E14455BA24F370AE2AB4887)
* 🔷 **LowPoly 低多边形面着色**：[Shader 源码链接](http://note.youdao.com/noteshare?id=c4622368bccb759c20f5b28066f93567&sub=B94AC932F78A42BEB27018D92371C8B4)
* 🦁 **多层 Shell 毛发生成**：[Shader 源码链接](http://note.youdao.com/noteshare?id=8de58b07a91dfd895779c822335e0273&sub=CAAA3CC848E044AAABB38951EACF2A6C)

---

## 2. OpenGL (GLSL) to Shader (CG) 转换实验

* ⭕ **HLSL/CG 极坐标抗锯齿画圆**：[Shader 源码链接](http://note.youdao.com/noteshare?id=3c79083c9d1cc11290d0708c694e81b4&sub=EA2D1242CBD94B5A9E120D8837B4D48F)
* ⭐ **程序化星形生成 (Star)**：[Shader 源码链接](http://note.youdao.com/noteshare?id=70b5fd7e2087cba04a27e87fbf3d2d93&sub=024DB0ADF65F4ECD9525D2F8CE2B0C42)
* 🌌 **分形深空星云效果 (StarNest)**：[Shader 源码链接](http://note.youdao.com/noteshare?id=551ebf18a875e612a7c57df35905f252&sub=828EF908107A452F928E50233A416842)

---

## 3. 光照与阴影模型

* 💡 **标准 Blinn-Phong 光照模型**：[Shader 源码链接](http://note.youdao.com/noteshare?id=97334ca69ad180bd4b05327f94558a50&sub=C4925B4269784B718D0A9FD20D3B15F1)
* 💡 **标准 Phong Diffuse 模型**：[Shader 源码链接](http://note.youdao.com/noteshare?id=5883fb09bd0dd8297e6f1acf70968d24&sub=C5F33EFE38D04F03BD1FADC3CA718822)
* 🪟 **透明混合 (Alpha Blend) + 阴影投射与接收**：[Shader 源码链接](http://note.youdao.com/noteshare?id=e7be3f0308ddc1492d3a853f5432995b&sub=05BEC44BDB4A4F139FAD25F5337D1C55)
* ✂️ **透明测试 (Alpha Test) + 阴影投射与接收**：[Shader 源码链接](http://note.youdao.com/noteshare?id=5cfce80d34655e3b88c27a434753a77c&sub=9DDFD5C7F48246C5B6957AEFBD9CEBC6)

---

## 4. 纹理与环境映射

* 🧊 **运行时环境映射立方体贴图生成 (C#)**：[C# 源码链接](http://note.youdao.com/noteshare?id=e56f72d482d41953f689de13fc201b55&sub=08FA64D35C4E4DF597777F17D4725C7E)
* 🪞 **CubeMap 立方体纹理反射**：[Shader 源码链接](http://note.youdao.com/noteshare?id=5a92aff8863d042e0bf890b36059b8a6&sub=9B3FA3929F194F4EBF30083438E7F7EE)
* 🔍 **CubeMap 立方体纹理折射**：[Shader 源码链接](http://note.youdao.com/noteshare?id=87ee36c4a79b57f2a6f840110b009f8c&sub=611D0E90500A49EBAAD7D13E0B55F27C)
* 🌈 **CubeMap 菲涅耳近似反射 (Fresnel)**：[Shader 源码链接](http://note.youdao.com/noteshare?id=d925c3ca075298f805a6913a5ecf9fb0&sub=9C06F4E5E2F8444496F3389AF35B5679)
* 🪞 **RenderTexture 实时平面镜面反射**：[Shader 源码链接](http://note.youdao.com/noteshare?id=03daad2532ba045b744161df291b8ab6&sub=3F6966D60386417CB501A9A9F91ACD99)
* 🥛 **RenderTexture 毛玻璃折射与后处理**：[Shader 源码链接](http://note.youdao.com/noteshare?id=24a72e417f6eca874d51d44aa00c0313&sub=0786485417844625B75EB3AE5197AB0E)
* 📐 **纯数学算法生成的程序化纹理**：[Shader 源码链接](http://note.youdao.com/noteshare?id=b6f0505968697823758a32fb5a74f928&sub=CEC48E1C1D2340238FDA6E8FA97514BA)
* 🎞️ **序列帧纹理播放动画**：[Shader 源码链接](http://note.youdao.com/noteshare?id=1992f2cf91ce308a60aca0a197aa6af0&sub=1C02CF4323ED45FAA597B55EF19554E5)
* 🛤️ **2D 背景无限滚动位移**：[Shader 源码链接](http://note.youdao.com/noteshare?id=a2fc19ffcb8831f9e1e503dd0cc791e5&sub=7998D38314A443BEB4BF6F7EF614AE3F)

---

## 5. 顶点动画与几何形变

* 🌊 **顶点正弦波河流动画**：[Shader 源码链接](http://note.youdao.com/noteshare?id=85b707c14b5e136acb6373593da4349b&sub=948E259449CC425CBB88C4F18FA436A0)
* 🌲 **Billboard 广告牌视线对齐技术**：[Shader 源码链接](http://note.youdao.com/noteshare?id=e569dd34386db1e4604c728069741db7&sub=88CFDE23F62D485093E1FAFE076C4EC0)
* 👥 **针对顶点动画重写自定义 ShadowCaster Pass**：[Shader 源码链接](http://note.youdao.com/noteshare?id=363bcfa630ede7c6266d480542e9b299&sub=2B31565A857D4C51889777B029AA37BB)
* 🎈 **沿法线外扩挤压膨胀**：[Shader 源码链接](http://note.youdao.com/noteshare?id=fa768bb279ee3b500f10ccb0427d09c6&sub=2AA4EC1C7C3149F79CF49F58CB427303)
* 📈 **高度梯度着色渐变**：[Shader 源码链接](http://note.youdao.com/noteshare?id=48e8645fd33a473b39a7b729410b3588&sub=BBB1E6E0996B4F679F0076F9F07E5D7D)

---

## 6. 屏幕后处理 (Post Processing)

* 🎨 **色彩调整（亮度、饱和度、对比度控制）**：[Shader 源码链接](http://note.youdao.com/noteshare?id=5d1f77376d3712d3358a45108322ce2f&sub=CD94EA66358846CA8EBDAEA21FA89D92)
* ✏️ **基于卷积核算子的屏幕边缘检测**：[Shader 源码链接](http://note.youdao.com/noteshare?id=0ff7330304f32c02dd787047ce81ead9&sub=74ED4CF8C19047F4AB1BB750A6D9064E)
* 🌫️ **双 Pass 降采样高斯模糊 (Gaussian Blur)**：[Shader 源码链接](http://note.youdao.com/noteshare?id=496badbae8c3902a90ae7df37ecc8989&sub=8C54292E4C7E4C8EBC4DD6A1B4119198)
* 🔆 **Bloom 泛光光晕效果**：[Shader 源码链接](http://note.youdao.com/noteshare?id=eb4a73bd8d3b20f428e432edbc501d9a&sub=BA78E5541599427398A99B78A446D104)
* 🏎️ **累积缓存运动模糊 (Accumulation Buffer)**：[Shader 源码链接](http://note.youdao.com/noteshare?id=9b3fa8446ab04a6beabf8ef33ee9ebcb&sub=9838242A55294DF6A4261B1C23789B73)
* 💨 **速度缓存向量运动模糊 (Velocity Buffer)**：[Shader 源码链接](http://note.youdao.com/noteshare?id=0d96c93e38fc97b44c0ceb7961a62663&sub=38FEAA5AA6664F289D2F415FD512F0B4)
* 🌁 **基于屏幕深度的全局雾效 (Global Fog)**：[Shader 源码链接](http://note.youdao.com/noteshare?id=01c32a1f56057693cefdbe7d6bb8b5fe&sub=B24E2771A4094172AD14D7B3CAA85E1E)
* 📐 **结合深度与法线纹理的高精度轮廓描边**：[Shader 源码链接](http://note.youdao.com/noteshare?id=35c37da83c670919cf804794098b4838&sub=066AD6FB60A140ECBCF6B21311FA3B1E)
* 📽️ **噪点划痕复古老电影胶片效果**：[Shader 源码链接](http://note.youdao.com/noteshare?id=e151af093641f86c1b2ba020962b27b9&sub=AC0456CD0992460A97570B6B35258B03)

---

## 7. 非真实感渲染 (NPR)

* 🎨 **基于色调离散采样的卡通着色 (Toon Shading)**：[Shader 源码链接](http://note.youdao.com/noteshare?id=4d16124d05988e2a074ba899d0ee5913&sub=9C79B03C3E1F4C499EB0A70C666402A1)
* ✏️ **色调艺术映射素描排线风格 (Sketch Rendering)**：[Shader 源码链接](http://note.youdao.com/noteshare?id=20becf442f18788a8b67fcb062723ed0&sub=65BD4C46F9CA4C798EE57A5440EFA814)

---

## 8. 噪声驱动特效 (Noise Effects)

* 🔥 **噪声纹理驱动的网格熔断消融**：[Shader 源码链接](http://note.youdao.com/noteshare?id=f7d4c1b0039dc12640495919c2b069c2&sub=E088A83DD58D458695674E4D4F8F98AF)
* 🌊 **噪声扰动水面法线动画**：[Shader 源码链接](http://note.youdao.com/noteshare?id=a572e2134c59d37db28111f5252dee9b&sub=3FF3A1F5F1F64E9BBB1BF1D0274BD914)
* ☁️ **Perlin 噪声动态漂移体积雾**：[Shader 源码链接](http://note.youdao.com/noteshare?id=a600830754af842c756ded9b77cea034&sub=6C8A23AA15C34C418F32B4D4556149C1)
