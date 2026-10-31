# MianXu 官网

参考 [adrianhajdin/award-winning-website](https://github.com/adrianhajdin/award-winning-website)（Zentry 风格）的动效体系，为 **MianXu —— 本地优先的 AI 面试工作台** 全新编写的官网落地页。

> 代码为本项目独立编写（非模板代码拷贝），借鉴其设计语言：GSAP 滚动动画、clip-path 斜切按钮、Bento 3D 悬停卡片、滚动感知导航栏、视频预览弹层。

## 技术栈

| 层 | 选型 |
|---|---|
| 框架 | React 18 + Vite 5 |
| 动画 | GSAP 3（ScrollTrigger scrub 逐词标题、入场时间线、鼠标跟随 3D 倾斜） |
| 样式 | Tailwind CSS 3（自定义 ink/snow/grape/volt 色板） |
| 视频 | [huashu-motion](https://github.com/alchaincyf/huashu-motion)（GSAP 合成 + 本机 Chrome 逐帧渲染 + 作曲家模式配乐） |

## 页面结构

- `Navbar` —— 滚动感知悬浮导航 + 移动端全屏菜单
- `Hero` —— 大字标题 + 宣传片预览卡（悬停 3D 倾斜，点击弹层播放）
- `About` —— 产品理念 + 真实界面截图 + 数据卡
- `VideoSection` —— **宣传视频专区**（内嵌完整播放器）
- `Features` —— 6 张 BentoTilt 功能卡（全部使用真实应用截图）
- `Story` —— 本地优先/BYOK 理念 + 鼠标跟随浮动面板 + 使用场景
- `Download` —— GitHub 下载区：Windows/macOS 官方图标 + 自动最新版下载
- `Contact` / `Footer` —— 下载 CTA（自动识别访客系统）与页脚（含 GitHub 图标入口）

### 自动最新版下载（零限流、免 API）

`api/` 下有两个 Vercel Serverless 函数（**部署后才生效**，本地 dev 自动回退到 Releases 页）：

- **`/api/download/[platform]`**（`win` / `win-portable` / `mac-arm` / `mac-intel`）
  服务端读取 Release 资产里的 Tauri 清单 `latest.json`（CDN 静态文件，**无 API 限流**），
  按最新版本号 302 到官方资产直链 —— 用户点击即直接下载，永远最新版。
- **`/api/latest`** —— 返回 `{ tag, date }`（边缘缓存 10 分钟），供下载区展示版本号。

原理：`releases/latest/download/latest.json` 是 GitHub Releases 的固定 CDN 地址，
但浏览器跨域读不到（无 CORS 头），所以由 Vercel 函数在服务端读取后重定向；
清单解析失败时自动兜底跳转 Releases 页，链接永不落空。
发新版本**无需改站**。

## 快速开始

```bash
npm install
npm run dev        # http://localhost:5180
npm run build      # 输出 dist/
npm run preview
```

## 宣传视频（huashu-motion 工作流）

宣传短片《说完，就答》（32s · 1920×1080 · 120 BPM · 带配乐音效）使用
[huashu-motion](https://github.com/alchaincyf/huashu-motion) skill 制作：片子是单个
`index.html`（GSAP 时间线 + OM 相机），配乐为 ABC 记谱本机合成，由本机 Chrome 逐帧渲染。

- 片子源码：`_film/mianxu-promo/index.html`（含可编辑变量：标题、问题文案、复盘分数、色彩等）
- 素材清单：`_film/mianxu-promo/materials.md`；导演节奏单：`_film/mianxu-promo/treatment.md`
- 真实素材：`assets/img/` 中的应用截图 + 界面 DOM 重建（布局/配色/文案均来自真实截图采样）
- 修改后重新导出：

```bash
# 依赖：Node 22+、Chrome/Edge、ffmpeg（PATH 中）；huashu-motion 位于
# E:\code\github_project\_ref_huashu_npm\package（npm 包）或 E:\code\github_project\huashu-motion（v0.3.1 仓库）
node E:\code\github_project\huashu-motion\cli\om.js check  _film\mianxu-promo   # 渲染前检查
node E:\code\github_project\huashu-motion\cli\om.js sound  _film\mianxu-promo   # 重新配乐
node E:\code\github_project\huashu-motion\cli\om.js render _film\mianxu-promo --blur   # 导出 MP4（out/）
node E:\code\github_project\huashu-motion\cli\om.js qa     _film\mianxu-promo   # 成片质检
node E:\code\github_project\huashu-motion\cli\om.js studio _film\mianxu-promo   # 浏览器编辑器：按 C 点画面改
```

导出后把 `out/mianxu-promo-vN.mp4` 复制为 `public/videos/mianxu-promo.mp4`，
并抽一帧封面覆盖 `public/videos/poster.jpg`。

## 部署到 Vercel

纯静态站，零配置：

- **Git 方式**：推送到 GitHub → Vercel 导入 → 自动识别 Vite（Build: `npm run build`，Output: `dist`）
- **CLI 方式**：`npm i -g vercel && vercel`

已附带 `vercel.json`（SPA rewrite），后续增加路由无需改动。

## 上线前待办（占位项）

- [ ] 品牌名：站内与截图已统一为 `MianXu`（应用源码 `src/lib/env.ts` 的 `BRAND`、`MainWindow.tsx` 的 `BrandMark`、`i18n.ts` 三处显示层已改，如需回退改回即可）
- [ ] `Contact` 组件的联系方式按钮目前锚回页顶，可替换为真实邮箱/下载链接
- [ ] 截图中 `app-mock-report.jpg` 为真实模拟面试复盘内容，如介意公开展示可替换
- [ ] `index.html` 的 meta description / title 按最终文案微调

## 目录结构

```
api/
  download/[platform].js   下载 302 端点（服务端解析 latest.json）
  latest.js                最新版本信息 JSON 端点
public/
  img/app/          真实应用截图（scripts/process_shots.py 生成）
  videos/           宣传视频（_film/mianxu-promo 由 huashu-motion 渲染导出）
_film/
  mianxu-promo/     宣传片工程（index.html 源码 / treatment.md / materials.md / out/ 成片）
  directions/       三个方向的关键帧与色板（制作过程留档）
scripts/
  make_promo.py     旧版 Pillow 渲染脚本（已被 huashu-motion 工作流取代，留档）
  preview_frames.py 抽帧预览（调样式用）
  process_shots.py  截图裁切
  sample_colors.py  从截图像素采样产品配色
src/
  components/       Navbar / Hero / About / VideoSection / Features /
                    Story / Download / Contact / Footer / VideoPreview /
                    AnimatedTitle / BentoTilt / Button / GithubIcon / OSIcons
  lib/gsap.js       GSAP + ScrollTrigger 注册
  lib/constants.js  GitHub 仓库常量 + downloadUrl()/latestInfoUrl()
```
