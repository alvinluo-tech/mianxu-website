# MianXu 官网

**MianXu —— 本地优先的 AI 面试工作台** 的官网落地页。

视觉体系参考 [alchaincyf/huashu-design](https://github.com/alchaincyf/huashu-design) 的设计规范：
品牌优先（颜色从真实产品界面采样，不凭记忆猜）、单一强调色、编辑级排版与留白、
动效带惯性（`expo.out`），并规避常见「AI 味」写法（紫色渐变、emoji 图标、每个标题上方的小号标签、
中点连接符、圆角卡片堆叠、按钮箭头）。

## 设计系统

| 项 | 取值 | 来源 |
|---|---|---|
| 底色 | `#0A0F19` / 面板 `#131929` | 采样自应用主窗口 |
| 强调色 | `#15AEF2`（青蓝），全站仅用于编号、下划线、进度与唯一主 CTA | 采样自界面主按钮 |
| 正文 | `#E8ECF4` / 次级 `#8A93A6` | 冷白纸感 |
| 展示字体 | 系统中文黑体（PingFang / 微软雅黑），`leading 0.9`、`tracking -0.02em` | — |
| 点缀字体 | Georgia 斜体（数字、章节号、图注） | — |
| 结构 | 细线分隔（`1px rgba(232,236,244,.14)`）、12 栏网格、编号章节 `01 / 产品` | — |
| 动效 | 行掩膜揭示 + `cubic-bezier(0.16,1,0.3,1)`；图片入场上浮 8% | — |

> 行掩膜需给 CJK 字形留余量：雅黑在 `line-height: 0.9` 时字形高约 86px、行框仅 59px，
> 上下各溢出约 `0.21em`，`.line-mask` 用 `padding: 0.24em` + 负 margin 抵消，否则会切掉笔画。

## 技术栈

| 层 | 选型 |
|---|---|
| 框架 | React 18 + Vite 5 |
| 动画 | GSAP 3 + ScrollTrigger（行掩膜揭示、图片上浮、`expo.out`） |
| 样式 | Tailwind CSS 3（`ink / paper / brand` 三组语义色 + `line` 分隔线） |
| 下载 | Vercel Serverless 函数读取 GitHub Releases 清单后 302 |
| 宣传片 | [motion-showreel](https://github.com/ConardLi/garden-skills) 工程（应用仓库 `promo-mianxu/v4-wide`） |

## 页面结构

- `Navbar` —— 细线悬浮导航（滚动收窄）+ 移动端全屏菜单（编号排版）
- `Hero` —— 超大标题 + 宣传片预览（悬停缓推、点击全屏）+ 四条规格事实条
- `About` —— 产品理念、三项关键数字（衬线数字）、全宽界面图
- `VideoSection` —— 宣传片专区：播放器 + 章节时间线（00:02 / 00:08 / 00:13 / 00:22 / 00:27 / 00:31）
- `Features` —— 七个能力，交替左右的长文条目（编号 + 三条差异化事实 + 界面图）
- `Story` —— 四条产品原则 + 引文 + 设置界面图
- `Download` —— Windows / macOS 双栏，官方图标，自动最新版直链
- `Contact` / `Footer` —— 系统识别 CTA（全站唯一青蓝按钮）、极简页脚

### 自动最新版下载（零限流、免 API）

`api/` 下有两个 Vercel Serverless 函数（**部署后才生效**，本地 dev 自动回退到 Releases 页）：

- **`/api/download/[platform]`**（`win` / `win-portable` / `mac-arm` / `mac-intel`）
  服务端读取 Release 资产里的 Tauri 清单 `latest.json`（CDN 静态文件，无 API 限流），
  按最新版本号 302 到官方资产直链 —— 用户点击即直接下载，永远最新版。
- **`/api/latest`** —— 返回 `{ tag, date }`（边缘缓存 10 分钟），供下载区展示版本号。

原理：`releases/latest/download/latest.json` 是固定 CDN 地址，但浏览器跨域读不到（无 CORS 头），
因此由函数在服务端读取后重定向；解析失败自动兜底跳 Releases 页。发新版本**无需改站**。

## 宣传片

正式成片为 **48 秒横版**（1920×1080 · 30fps · 24 小节 @120 BPM），源码在应用仓库
`mianshi-copilot/promo-mianxu/v4-wide/`（motion-showreel 工程：`index.html` + `timeline.js` + `score.mjs`），
用 `render.mjs . --size 1920x1080 --fps 30 --audio audio/music.wav` 渲染后拷到 `public/videos/`。
`_film/mianxu-promo/` 是上一版 32 秒片子的旧工程，只作留档。

派生资源（首页循环片段、封面）都由成片转出：

```bash
# 首页循环：取 10–19.5s，首尾 0.5s 交叉淡化，循环点不留跳帧
ffmpeg -ss 10 -t 9.5 -i public/videos/mianxu-promo.mp4 -an \
  -vf "scale=1100:618,fps=30,format=yuv420p" -c:v libx264 -crf 18 .tmp-hero.mp4
ffmpeg -i .tmp-hero.mp4 -i .tmp-hero.mp4 -filter_complex \
  "[0:v]trim=0:0.5,setpts=PTS-STARTPTS[a];[1:v]trim=9:9.5,setpts=PTS-STARTPTS[b];\
   [a][b]xfade=transition=fade:duration=0.5:offset=0[x];[1:v]trim=0.5:9,setpts=PTS-STARTPTS[m];\
   [m][x]concat=n=2:v=1:a=0[out]" -map "[out]" -an -r 30 \
  -c:v libx264 -crf 22 -pix_fmt yuv420p -movflags +faststart public/videos/hero-loop.mp4
# 封面
ffmpeg -ss 13.7 -i public/videos/mianxu-promo.mp4 -frames:v 1 -q:v 3 public/videos/poster.jpg
```

章节文案（`video.ch1`–`ch6`）与时长标注随片改动，24 个语言包同步更新。

`scripts/make_promo.py` 是早期的 Pillow 备用样片生成器，只输出到
`public/videos/fallback/`，**不会覆盖正式成片**（`npm run promo:fallback`）。

## 快速开始

```bash
npm install
npm run dev        # http://localhost:5180（被占用时顺延）
npm run build      # 输出 dist/
npm run preview
```

## 部署

纯静态站 + 两个函数，Vercel 零配置：

- **Git 方式**：推送到 GitHub → Vercel 导入（自动识别 Vite，Build `npm run build`，Output `dist`）
- **CLI 方式**：`npm i -g vercel && vercel --prod`

`vercel.json` 的 SPA rewrite 已排除 `/api/*`。

## 目录结构

```
api/
  download/[platform].js   下载 302 端点（服务端解析 latest.json）
  latest.js                最新版本信息 JSON 端点
public/
  img/app/                 真实应用截图
  img/app-icon.png         应用图标
  videos/                  宣传成片 + 派生资源
scripts/
  make_promo.py            备用样片生成（输出到 fallback/）
  preview_frames.py        样片抽帧预览
  process_shots.py         截图裁切
  sample_colors.py         产品配色采样
src/
  components/              Navbar / Hero / About / VideoSection / Features /
                           Story / Download / Contact / Footer / VideoPreview /
                           RevealTitle / Button / GithubIcon / OSIcons
  lib/gsap.js              GSAP + ScrollTrigger 注册
  lib/constants.js         仓库常量 + downloadUrl() / latestInfoUrl()
_film/                     huashu-motion 宣传片工程（不入库）
```
