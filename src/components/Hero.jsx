import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import AnimatedTitle from "./AnimatedTitle";
import VideoPreview from "./VideoPreview";
import GithubIcon from "./GithubIcon";
import { GITHUB_REPO } from "../lib/constants";

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-line",
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, delay: 0.2 }
      )
        .fromTo(".hero-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.55")
        .fromTo(".hero-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4")
        .fromTo(
          ".hero-visual",
          { y: 60, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 1.1 },
          "-=0.6"
        );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pb-16 pt-32"
    >
      {/* 背景光斑 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-grape-500/25 blur-[140px]" />
        <div className="absolute right-[-220px] top-1/3 h-[420px] w-[420px] rounded-full bg-grape-400/15 blur-[120px]" />
        <div className="absolute bottom-[-180px] left-[-180px] h-[380px] w-[380px] rounded-full bg-grape-deep/60 blur-[110px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div>
          <p className="section-tag hero-line">MianXu · AI 面试工作台</p>
          <h1 className="game-title text-5xl text-snow sm:text-7xl lg:text-[5rem]">
            <span className="hero-line block">让每一场面试</span>
            <span className="hero-line block text-snow-75">
              都有<span className="text-volt">备而来</span>
            </span>
          </h1>
          <p className="hero-sub mt-6 max-w-xl text-lg leading-relaxed text-snow-75">
            面试实时听译与作答、笔试截屏解题、模拟面试动态对话与复盘报告。
            本地优先 —— AI 能力对接你自己的接口，数据保存在你自己的电脑上。
          </p>
          <div className="hero-cta mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#video"
              className="inline-flex items-center gap-2 bg-volt px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-ink transition-all hover:brightness-110 [clip-path:polygon(6%_0,100%_0,94%_100%,0_100%)]"
            >
              ▶ 观看宣传视频
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 border border-snow-50/30 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-snow transition-all hover:bg-snow-50/10 [clip-path:polygon(6%_0,100%_0,94%_100%,0_100%)]"
            >
              了解核心功能
            </a>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-snow-50/30 px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-snow transition-all hover:bg-snow-50/10 [clip-path:polygon(6%_0,100%_0,94%_100%,0_100%)]"
            >
              <GithubIcon className="h-[18px] w-[18px]" />
              GitHub
            </a>
          </div>
          <div className="hero-cta mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs font-bold uppercase tracking-[0.18em] text-snow-25">
            <span>◆ 本地优先</span>
            <span>◆ 多语言面试</span>
            <span>◆ 复盘报告</span>
            <span>◆ 自带 AI 接口</span>
          </div>
        </div>

        <div className="hero-visual">
          <VideoPreview />
        </div>
      </div>

      {/* 滚动提示 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <div className="h-10 w-6 animate-float rounded-full border-2 border-snow-50/25 p-1">
          <div className="mx-auto h-2 w-1 rounded-full bg-snow-50/50" />
        </div>
      </div>
    </section>
  );
}
