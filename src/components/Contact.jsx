import { useState } from "react";
import RevealTitle from "./RevealTitle";
import GithubIcon from "./GithubIcon";
import { downloadUrl, GITHUB_REPO } from "../lib/constants";

function detectOS() {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  if (/Mac|iPhone|iPad/i.test(ua)) return "mac-arm";
  if (/Win/i.test(ua)) return "win";
  return "other";
}

const LABELS = {
  win: "下载 Windows 版",
  "mac-arm": "下载 macOS 版",
  other: "前往下载",
};

export default function Contact() {
  const [os] = useState(detectOS);

  return (
    <section id="contact" className="scroll-mt-24 border-t border-line py-28 md:py-40">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <RevealTitle
              className="display text-[clamp(2.6rem,6.4vw,5.6rem)] text-paper"
              lines={["下一场，", "有备而来。"]}
            />
          </div>
          <div className="lg:col-span-4">
            <p className="prose-body">
              下载桌面端，接入你自己的模型，五分钟后开始第一场有备而来的面试。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={downloadUrl(os)}
                className="inline-flex items-center bg-brand px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-paper transition-colors duration-500 ease-expo hover:bg-brand-light"
              >
                {LABELS[os]}
              </a>
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 border border-line px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors duration-500 ease-expo hover:border-paper/50 hover:bg-paper/[0.04]"
              >
                <GithubIcon className="h-4 w-4" />
                源码
              </a>
            </div>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper-mute">
              其他版本请见{" "}
              <a href="#download" className="text-paper-ash underline underline-offset-4">
                下载区
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
