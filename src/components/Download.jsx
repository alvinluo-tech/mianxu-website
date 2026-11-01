import { useEffect, useState } from "react";
import { AppleIcon, WindowsIcon } from "./OSIcons";
import GithubIcon from "./GithubIcon";
import RevealTitle from "./RevealTitle";
import { downloadUrl, latestInfoUrl, GITHUB_REPO, GITHUB_RELEASES } from "../lib/constants";

const PLATFORMS = [
  {
    key: "windows",
    Icon: WindowsIcon,
    name: "Windows",
    meta: "10 (2004+) / 11 · x64",
    note: "安装版支持应用内自动更新",
    items: [
      { key: "win", label: "下载安装包", meta: "10.8 MB" },
      { key: "win-portable", label: "便携版", meta: "31.4 MB" },
    ],
  },
  {
    key: "macos",
    Icon: AppleIcon,
    name: "macOS",
    meta: "12+ · Apple Silicon / Intel",
    note: "下载后拖入 Applications",
    items: [
      { key: "mac-arm", label: "Apple Silicon", meta: "13.7 MB" },
      { key: "mac-intel", label: "Intel", meta: "15.5 MB" },
    ],
  },
];

function useLatestInfo() {
  const [info, setInfo] = useState(null);
  useEffect(() => {
    const url = latestInfoUrl();
    if (!url) return undefined;
    let alive = true;
    fetch(url)
      .then((r) => r.json())
      .then((d) => alive && d && d.tag && setInfo(d))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return info;
}

export default function Download() {
  const latest = useLatestInfo();

  return (
    <section id="download" className="scroll-mt-24 border-t border-line py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow">05 / 下载</p>
          </div>
          <div className="lg:col-span-9">
            <RevealTitle
              className="display text-[clamp(2.1rem,4.6vw,4.1rem)] text-paper"
              lines={["开源免费，", "始终最新版本。"]}
            />
            <p className="mt-8 max-w-[54ch] prose-body">
              桌面端基于 Tauri 2 构建，体积小、启动快。下载地址始终指向 GitHub 上的最新 Release，
              无需在本站更新版本号。
            </p>

            <div className="mt-14 grid max-w-4xl border-t border-line md:grid-cols-2">
              {PLATFORMS.map((p, i) => (
                <div
                  key={p.key}
                  className={`border-b border-line py-10 md:py-12 ${
                    i === 1 ? "md:border-l md:border-line md:pl-10" : "md:pr-10"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <p.Icon className="h-6 w-6 text-paper-ash" />
                    <h3 className="display text-[2.15rem] leading-none text-paper">{p.name}</h3>
                  </div>
                  <p className="mt-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-mute">
                    {p.meta}
                  </p>

                  <div className="mt-8 space-y-3">
                    {p.items.map((item, j) => (
                      <a
                        key={item.key}
                        href={downloadUrl(item.key)}
                        className={`flex items-baseline justify-between px-5 py-4 transition-colors duration-500 ease-expo ${
                          j === 0
                            ? "bg-paper text-ink hover:bg-white"
                            : "border border-line text-paper hover:border-paper/50 hover:bg-paper/[0.04]"
                        }`}
                      >
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
                          {item.label}
                        </span>
                        <span
                          className={`font-mono text-[10px] tracking-[0.1em] ${
                            j === 0 ? "text-ink/60" : "text-paper-mute"
                          }`}
                        >
                          {item.meta}
                        </span>
                      </a>
                    ))}
                  </div>

                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-mute">
                    {p.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line py-6">
              <div className="flex items-baseline gap-6">
                <a
                  href={GITHUB_REPO}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:text-brand"
                >
                  <GithubIcon className="h-4 w-4" />
                  源码仓库
                </a>
                <a
                  href={GITHUB_RELEASES}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline font-mono text-[11px] uppercase tracking-[0.2em] text-paper-ash transition-colors hover:text-paper"
                >
                  全部版本
                </a>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-mute">
                {latest ? `Latest ${latest.tag}${latest.date ? ` · ${latest.date}` : ""}` : "Latest · GitHub Releases"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
