import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import AnimatedTitle from "./AnimatedTitle";
import BentoTilt from "./BentoTilt";
import GithubIcon from "./GithubIcon";
import { AppleIcon, WindowsIcon } from "./OSIcons";
import { downloadUrl, latestInfoUrl, GITHUB_REPO, GITHUB_RELEASES } from "../lib/constants";

function DownloadArrow({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

/**
 * 卡片配置：icon 为组件；下载链接由 downloadUrl() 提供（生产 = Vercel 302 最新版直链）
 */
const CARDS = [
  {
    os: "Windows",
    Icon: WindowsIcon,
    desc: "Windows 10 (2004+) / 11 · x64 · 支持应用内自动更新",
    items: [
      { key: "win", label: "安装包 · 10.8 MB", primary: true },
      { key: "win-portable", label: "便携版 · 31.4 MB", primary: false },
    ],
  },
  {
    os: "macOS",
    Icon: AppleIcon,
    desc: "macOS 12+ · 拷入 Applications 即可使用",
    items: [
      { key: "mac-arm", label: "Apple Silicon · 13.7 MB", primary: true },
      { key: "mac-intel", label: "Intel · 15.5 MB", primary: false },
    ],
  },
  {
    os: "源码与全部版本",
    Icon: GithubIcon,
    desc: "Tauri 2 + React · pnpm install && pnpm tauri build",
    items: [
      { label: "查看源码仓库", href: GITHUB_REPO, primary: true, github: true, page: true },
      { label: "全部 Releases", href: GITHUB_RELEASES, primary: false, page: true },
    ],
  },
];

/** 同源读取最新版本号（/api/latest，边缘缓存；dev 下不展示） */
function useLatestInfo() {
  const [info, setInfo] = useState(null);
  useEffect(() => {
    const url = latestInfoUrl();
    if (!url) return undefined;
    let alive = true;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (alive && data && data.tag) setInfo(data);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return info;
}

export default function Download() {
  const ref = useRef(null);
  const latest = useLatestInfo();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-up").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: (i % 3) * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="download" ref={ref} className="relative overflow-hidden py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-grape-500/15 blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="section-tag">Download · 立即获取</p>
          <AnimatedTitle
            containerClass="game-title justify-center text-center text-4xl sm:text-6xl"
            lineClass="justify-center"
            title={[[{ text: "开源免费" }, { text: " · 就在 GitHub", color: "#D8FF3E" }]]}
          />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-snow-75">
            {latest
              ? `最新版本 ${latest.tag}${latest.date ? ` · ${latest.date} 发布` : ""} · `
              : "始终保持最新版本 · "}
            桌面端已签名自动更新。下载安装后，打开「设置 → AI 服务」接入你自己的模型即可使用。
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {CARDS.map((card) => (
            <BentoTilt key={card.os} className="reveal-up will-change-transform">
              <div className="group flex h-full flex-col rounded-3xl border border-snow-50/10 bg-ink-700 p-6 transition-colors duration-300 hover:border-grape-400/40">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-grape-400/20 text-grape-200">
                    <card.Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-black">{card.os}</h3>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-snow-50">{card.desc}</p>
                <div className="mt-5 flex flex-col gap-2.5">
                  {card.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.page ? item.href : downloadUrl(item.key)}
                      {...(item.page ? { target: "_blank", rel: "noreferrer" } : {})}
                      className={`inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 [clip-path:polygon(5%_0,100%_0,95%_100%,0_100%)] ${
                        item.primary
                          ? "bg-volt text-ink hover:brightness-110"
                          : "border border-snow-50/30 text-snow hover:bg-snow-50/10"
                      }`}
                    >
                      {item.github && <GithubIcon className="h-4 w-4" />}
                      {!item.github && !item.page && <DownloadArrow />}
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </BentoTilt>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-snow-25">
          下载即表示同意将 AI 请求发送至你自行配置的服务商 · MianXu 不收集任何数据
        </p>
      </div>
    </section>
  );
}
