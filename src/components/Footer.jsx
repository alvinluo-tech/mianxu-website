import GithubIcon from "./GithubIcon";
import { GITHUB_REPO, GITHUB_RELEASES } from "../lib/constants";

const NAV = [
  { label: "产品理念", href: "#about" },
  { label: "宣传视频", href: "#video" },
  { label: "核心功能", href: "#features" },
  { label: "使用场景", href: "#story" },
  { label: "下载", href: "#download" },
  { label: "联系我们", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-snow-50/10 bg-ink-800/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <a href="#top" className="flex items-center gap-2.5">
              <img
                src="/img/app-icon.png"
                alt="MianXu 应用图标"
                className="h-9 w-9 rounded-xl"
              />
              <span className="font-display text-xl font-black tracking-wide">MIANXU</span>
            </a>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub 仓库"
              className="grid h-9 w-9 place-items-center rounded-lg border border-snow-50/15 text-snow-50 transition-all hover:border-snow-50/40 hover:text-snow"
            >
              <GithubIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-snow-25">
            本地优先的 AI 面试工作台。面试实时听译与作答、笔试截屏解题、模拟面试动态对话与复盘报告。
          </p>
          <p className="mt-5 font-display text-sm font-bold uppercase tracking-[0.25em] text-grape-200">
            Let every interview be prepared.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-snow-50">导航</h4>
          <ul className="mt-4 space-y-2.5">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-snow-25 transition-colors hover:text-snow">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-snow-50">开源</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-snow-25 transition-colors hover:text-snow"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub 仓库
              </a>
            </li>
            <li>
              <a
                href={GITHUB_RELEASES}
                target="_blank"
                rel="noreferrer"
                className="text-snow-25 transition-colors hover:text-snow"
              >
                全部版本 Releases
              </a>
            </li>
            <li>桌面端基于 Tauri 2 构建</li>
            <li>数据保存在用户本机</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-snow-50/5 py-6 text-center text-xs text-snow-25">
        © 2026 MianXu · 让每一场面试都有备而来
      </div>
    </footer>
  );
}
