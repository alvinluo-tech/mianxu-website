import { useState } from "react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import GithubIcon from "./GithubIcon";
import { downloadUrl, GITHUB_REPO } from "../lib/constants";

function detectOS() {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  if (/Mac|iPhone|iPad/i.test(ua)) return "mac-arm";
  if (/Win/i.test(ua)) return "win";
  return "other";
}

const CTA_LABELS = {
  win: "⬇ 下载 Windows 安装包",
  "mac-arm": "⬇ 下载 macOS (Apple Silicon)",
  other: "⬇ 前往下载",
};

export default function Contact() {
  const [os] = useState(detectOS);

  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-grape-500/20 blur-[140px]"
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <AnimatedTitle
          containerClass="game-title justify-center text-center text-5xl sm:text-7xl"
          lineClass="justify-center"
          title={[
            [{ text: "准备好迎接" }],
            [{ text: "下一场", color: "#9A9DB9" }, { text: "面试", color: "#D8FF3E" }, { text: "了吗" }],
          ]}
        />
        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-snow-75">
          下载桌面端（自动获取最新版本），打开「设置 → AI 服务」接入你自己的模型，
          五分钟后开始第一场有备而来的面试。
        </p>
        <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
          <Button href={downloadUrl(os)}>{CTA_LABELS[os]}</Button>
          <Button variant="grape" href={GITHUB_REPO} external>
            <GithubIcon className="h-4 w-4" />
            GitHub 仓库
          </Button>
        </div>
        <p className="mt-6 text-xs text-snow-25">
          其他系统版本（Windows 便携版 / macOS Intel）请前往{" "}
          <a href="#download" className="text-grape-200 underline underline-offset-4 hover:text-snow">
            下载区
          </a>
        </p>
      </div>
    </section>
  );
}
