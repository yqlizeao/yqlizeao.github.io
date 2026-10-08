# Leo's Blog

个人博客，基于 [Hexo 8](https://hexo.io/) 与 [Stellar 2.0](https://github.com/xaoxuu/hexo-theme-stellar) 主题搭建。

## 本地开发与预览

1. **安装依赖**：
   ```bash
   npm install
   ```

2. **本地调试运行**：
   ```bash
   npm run server
   # 或者
   npx hexo server
   ```
   浏览器访问 `http://localhost:4000/` 即可实时预览。

3. **生成静态文件**：
   ```bash
   npm run build
   # 或者
   npx hexo clean && npx hexo generate
   ```

4. **新建文章**：
   ```bash
   npx hexo new post "文章标题"
   ```

## 部署说明

仓库配置了 GitHub Actions 自动构建工作流（`.github/workflows/deploy.yml`）。
代码推送到 `master` 分支后，GitHub Actions 会自动编译 Hexo 站点并发布到 GitHub Pages。
