import { useState } from "react";
import RevealTitle from "./RevealTitle";
import { downloadUrl } from "../lib/constants";
import { detectTarget } from "../lib/detectTarget";

function detectOS() {
  if (typeof navigator === "undefined") return "other";
  return detectTarget({
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    maxTouchPoints: navigator.maxTouchPoints || 0,
  });
}

const LABELS = {
  win: "下载 Windows 版",
  "mac-arm": "下载 macOS 版",
  other: "选择你的系统",
};

const NOTES = {
  win: "macOS 版与便携版见下载区",
  "mac-arm": "Apple Silicon 版 · Intel Mac 请选下载区的 Intel 版",
  other: "iOS / iPadOS 暂无桌面版，请用电脑打开",
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
            <div className="mt-8">
              <a
                href={os === "other" ? "#download" : downloadUrl(os)}
                className="inline-flex items-center bg-brand px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-paper transition-colors duration-500 ease-expo hover:bg-brand-light"
              >
                {LABELS[os]}
              </a>
            </div>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper-mute">
              {NOTES[os]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
