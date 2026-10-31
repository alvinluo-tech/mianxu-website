import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import AnimatedTitle from "./AnimatedTitle";
import BentoTilt from "./BentoTilt";

const F = {
  workbench: {
    img: "/img/app/app-workbench.jpg",
    tag: "Interview",
    title: "面试工作台",
    desc: "系统声音实时听译，AI 按你的简历、岗位与资料流式作答；静音门限与回答风格随时可调。",
  },
  mock: {
    img: "/img/app/app-mock.jpg",
    tag: "Mock Room",
    title: "模拟面试间",
    desc: "独立面试窗口：AI 面试官动态出题、按回答追问换题、TTS 播报，支持语音与文字作答。",
  },
  report: {
    img: "/img/app/app-mock-report.jpg",
    tag: "Review",
    title: "复盘报告",
    desc: "每场模拟自动生成复盘报告，跨重启续场、历史回看，让每一次练习都有沉淀。",
  },
  bank: {
    img: "/img/app/app-bank.jpg",
    tag: "Question Bank",
    title: "AI 面试题库",
    desc: "按简历与岗位生成定制题目，参考回答可一键存入面试资料，形成你自己的弹药库。",
  },
  materials: {
    img: "/img/app/app-materials.jpg",
    tag: "Assets",
    title: "资料管理",
    desc: "简历、岗位、面试资料与预设问答统一管理，AI 出题与作答共享同一份上下文。",
  },
  history: {
    img: "/img/app/app-history.jpg",
    tag: "History",
    title: "历史记录",
    desc: "面试问答与笔试记录完整留存，支持重命名、删除、导出 markdown 与复盘回看。",
  },
};

function CardText({ tag, title, desc }) {
  return (
    <>
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-grape-200">{tag}</p>
      <h3 className="mt-1.5 font-display text-2xl font-black">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-snow-50">{desc}</p>
    </>
  );
}

function CardImage({ img, alt, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-snow-50/10 ${className}`}>
      <img
        src={img}
        alt={alt}
        loading="lazy"
        className="aspect-[16/10] w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.04]"
      />
    </div>
  );
}

/** 横排卡：文 + 图并排（flip 控制图在右/左），截图按原生比例完整展示 */
function WideCard({ f, spanClass, flip = false, reverse = false }) {
  return (
    <BentoTilt className={`feature-card will-change-transform ${spanClass}`}>
      <div
        className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-snow-50/10 bg-ink-700 transition-colors duration-300 hover:border-grape-400/40 lg:flex-row lg:items-center ${
          flip ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className={`p-6 lg:w-[44%] ${reverse ? "lg:order-2" : "lg:order-1"}`}>
          <CardText tag={f.tag} title={f.title} desc={f.desc} />
        </div>
        <div className={`p-4 lg:w-[56%] ${reverse ? "lg:order-1 lg:p-6" : "lg:order-2"}`}>
          <CardImage img={f.img} alt={`MianXu ${f.title}界面`} />
        </div>
      </div>
    </BentoTilt>
  );
}

/** 竖排卡：图上文下 */
function StackCard({ f }) {
  return (
    <BentoTilt className="feature-card will-change-transform lg:col-span-2">
      <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-snow-50/10 bg-ink-700 transition-colors duration-300 hover:border-grape-400/40">
        <div className="p-4 pb-0">
          <CardImage img={f.img} alt={`MianXu ${f.title}界面`} />
        </div>
        <div className="flex flex-1 flex-col p-6 pt-5">
          <CardText tag={f.tag} title={f.title} desc={f.desc} />
        </div>
      </div>
    </BentoTilt>
  );
}

export default function Features() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".feature-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 70, opacity: 0 },
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
    <section id="features" ref={ref} className="relative overflow-hidden py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-grape-500/12 blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="section-tag">Features · 核心功能</p>
          <AnimatedTitle
            containerClass="game-title justify-center text-center text-4xl sm:text-6xl"
            lineClass="justify-center"
            title={[[{ text: "一个工作台" }, { text: "装下整场面试", color: "#D8FF3E" }]]}
          />
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-6">
          {/* 第一排：两张并排横卡（主打能力） */}
          <WideCard f={F.workbench} spanClass="lg:col-span-3" />
          <WideCard f={F.mock} spanClass="lg:col-span-3" flip />

          {/* 第二排：三张竖排卡 */}
          <StackCard f={F.report} />
          <StackCard f={F.bank} />
          <StackCard f={F.materials} />

          {/* 收官：全宽横卡 */}
          <WideCard f={F.history} spanClass="lg:col-span-6" flip reverse />
        </div>
      </div>
    </section>
  );
}
