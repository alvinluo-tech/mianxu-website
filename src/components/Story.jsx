import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import AnimatedTitle from "./AnimatedTitle";
import BentoTilt from "./BentoTilt";

const SCENES = [
  { icon: "🎓", title: "校招冲刺", desc: "题库定制 + 高频模拟，把八股变成肌肉记忆" },
  { icon: "🚀", title: "社招跳槽", desc: "带简历与项目上下文作答，回答贴合你的经历" },
  { icon: "🌍", title: "外企英文面", desc: "多语言听译与作答，跨语言面试不再发怵" },
  { icon: "🔁", title: "日常练习", desc: "碎片时间开一间模拟面试，复盘报告持续迭代" },
];

export default function Story() {
  const ref = useRef(null);
  const floatRef = useRef(null);

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

  // FloatingImage：鼠标跟随 3D 浮动（zentry Story 风格）
  useEffect(() => {
    const el = floatRef.current;
    if (!el) return undefined;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const cy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      gsap.to(el, {
        duration: 0.6,
        ease: "power3.out",
        transformPerspective: 1100,
        rotateX: -cy * 10,
        rotateY: cx * 12,
      });
    };
    const onLeave = () => {
      gsap.to(el, { duration: 1.1, ease: "power3.out", rotateX: 0, rotateY: 0 });
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="story" ref={ref} className="relative overflow-hidden py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[-200px] h-[420px] w-[420px] rounded-full bg-grape-deep/70 blur-[130px]"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* 浮动截图 */}
          <div className="reveal-up order-2 lg:order-1">
            <div
              ref={floatRef}
              className="relative mx-auto max-w-xl will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="rounded-3xl border border-snow-50/12 bg-ink-700 p-2.5 shadow-panel">
                <img
                  src="/img/app/app-settings.jpg"
                  alt="MianXu 设置界面"
                  className="aspect-[16/10] w-full rounded-2xl object-cover object-left-top"
                  loading="lazy"
                />
              </div>
              <div
                className="absolute -right-5 -top-6 rounded-2xl border border-volt/40 bg-ink/90 px-5 py-3 shadow-glow backdrop-blur"
                style={{ transform: "translateZ(60px)" }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt">Local First</p>
                <p className="mt-0.5 font-display text-lg font-black">数据保存在本机</p>
              </div>
              <div
                className="absolute -bottom-6 -left-4 rounded-2xl border border-snow-50/15 bg-ink/90 px-5 py-3 backdrop-blur"
                style={{ transform: "translateZ(40px)" }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-grape-200">BYOK</p>
                <p className="mt-0.5 font-display text-lg font-black">多供应商 AI 接口</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="section-tag reveal-up">Principle · 使用场景</p>
            <AnimatedTitle
              containerClass="game-title text-4xl sm:text-5xl"
              title={[
                [{ text: "工具应该懂面试" }],
                [{ text: "更该", color: "#9A9DB9" }, { text: "懂你", color: "#D8FF3E" }],
              ]}
            />
            <div className="reveal-up mt-7 space-y-4 text-base leading-relaxed text-snow-75">
              <p>
                快捷键体系、多语言支持、主题与字号自定义 —— 每一处细节都按你的习惯来；
                数据、模型、边界，全部由你自己定义。
              </p>
            </div>

            <div className="reveal-up mt-9 grid gap-4 sm:grid-cols-2">
              {SCENES.map((s) => (
                <div
                  key={s.title}
                  className="glass-panel group p-5 transition-colors duration-300 hover:border-grape-400/40"
                >
                  <span className="text-2xl">{s.icon}</span>
                  <h3 className="mt-2 font-display text-lg font-black">{s.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-snow-50">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
