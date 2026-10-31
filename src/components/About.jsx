import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import AnimatedTitle from "./AnimatedTitle";
import BentoTilt from "./BentoTilt";

const STATS = [
  { value: "8", unit: "大功能模块", desc: "工作台 / 笔试 / 模拟面试 / 题库 / 资料 / 历史" },
  { value: "18", unit: "个全局热键", desc: "滚动、答题、截屏、移动，全键盘掌控" },
  { value: "100%", unit: "数据本地保存", desc: "AI 能力对接你自己的 OpenAI 兼容接口" },
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-up").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-200px] top-1/4 h-[420px] w-[420px] rounded-full bg-grape-500/15 blur-[130px]"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <p className="section-tag reveal-up">About · 产品理念</p>
          <AnimatedTitle
            containerClass="game-title text-4xl sm:text-5xl lg:text-6xl"
            title={[
              [{ text: "把面试准备" }],
              [{ text: "做成一门", color: "#9A9DB9" }, { text: "手艺", color: "#D8FF3E" }],
            ]}
          />
          <div className="reveal-up mt-8 space-y-5 text-base leading-relaxed text-snow-75">
            <p>
              MianXu（面序）是一款本地优先的 AI 面试工作台。面试工作台实时听译与作答，
              笔试工作台截屏解题，模拟面试间里 AI 面试官按你的简历与岗位动态出题、追问、换题。
            </p>
            <p>
              每一场模拟都会沉淀为复盘报告；每一份简历、岗位与预设问答都存放在你自己的电脑上 ——
              工具越强，越应该把控制权交还给你。
            </p>
          </div>

          <div className="reveal-up mt-10 grid gap-4 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.unit} className="glass-panel p-5">
                <p className="font-display text-3xl font-black text-volt">
                  {s.value}
                  <span className="ml-1 text-xs font-bold uppercase tracking-wider text-snow-50">
                    {s.unit}
                  </span>
                </p>
                <p className="mt-2 text-xs leading-relaxed text-snow-25">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 产品实拍截图 */}
        <div className="reveal-up">
          <BentoTilt className="relative will-change-transform" max={6}>
            <div className="relative rounded-3xl border border-snow-50/12 bg-ink-700 p-2.5 shadow-panel">
              <img
                src="/img/app/app-workbench.jpg"
                alt="MianXu 面试工作台界面"
                className="aspect-[16/10] w-full rounded-2xl object-cover object-left-top"
                loading="lazy"
              />
              <div className="absolute inset-x-2.5 bottom-2.5 rounded-b-2xl bg-gradient-to-t from-ink/85 to-transparent p-6 pt-16">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-volt">
                  Interview Workbench
                </p>
                <p className="mt-1 font-display text-xl font-black">面试工作台 · 实听实答</p>
              </div>
            </div>
          </BentoTilt>
          <p className="mt-4 text-center text-xs text-snow-25">↑ MianXu 桌面端真实界面</p>
        </div>
      </div>
    </section>
  );
}
