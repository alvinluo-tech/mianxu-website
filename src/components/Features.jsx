import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import RevealTitle from "./RevealTitle";
import Shot from "./Shot";

const FEATURES = [
  {
    idx: "01",
    tag: "Interview",
    title: "面试工作台",
    desc: "系统声音直采实时听译，AI 按你的简历、岗位与资料流式作答；静音门限与回答风格随时可调。",
    facts: ["系统音频直采，无需外部录音", "静音 1.6 秒自动触发作答", "回答风格三档：稳妥 / 适中 / 灵敏"],
    shot: "app-workbench",
    alt: "MianXu 面试工作台界面",
    caption: "Fig. 02 — 面试工作台",
  },
  {
    idx: "02",
    tag: "Mock Room",
    title: "模拟面试间",
    desc: "独立面试窗口：AI 面试官按简历与岗位动态出题，根据你的回答追问或换题，用 TTS 播报。",
    facts: ["按简历与岗位生成题库", "回答后即时追问或换题", "文字或语音作答，结束出复盘"],
    shot: "app-mock-live",
    darkOnly: true,
    alt: "MianXu 模拟面试对话界面",
    caption: "Fig. 03 — 模拟面试间 · 对话",
  },
  {
    idx: "03",
    tag: "Review",
    title: "复盘报告",
    desc: "每场模拟结束后生成结构化复盘：整体表现、逐题点评与改进建议，保存进该场记录。",
    facts: ["逐题亮点与可改进点", "跨重启续场、历史回看", "本地生成，可随时导出"],
    shot: "app-mock-report",
    darkOnly: true,
    alt: "MianXu 复盘报告界面",
    caption: "Fig. 04 — 复盘报告",
  },
  {
    idx: "04",
    tag: "Free Chat",
    title: "自由对话",
    desc: "文字与语音双通道的助手：问知识、理思路，也可以按需查询本地的简历、岗位与面试记录。",
    facts: ["文字 / 语音两种输入", "本地资料按需授权查询", "对话历史自动留存"],
    shot: "app-ai",
    alt: "MianXu 自由对话界面",
    caption: "Fig. 05 — 自由对话",
  },
  {
    idx: "05",
    tag: "Question Bank",
    title: "AI 面试题库",
    desc: "按简历与岗位生成定制题目，参考回答一键存入面试资料，逐步形成你自己的弹药库。",
    facts: ["按岗位方向定制", "参考答案可入库复用", "与资料管理共享同一份上下文"],
    shot: "app-bank",
    alt: "MianXu 面试题库界面",
    caption: "Fig. 06 — 面试题库",
  },
  {
    idx: "06",
    tag: "Assets",
    title: "资料管理",
    desc: "简历、岗位、面试资料与预设问答统一维护，出题与作答读取同一份上下文。",
    facts: ["PDF / 图片 / 文本统一入库", "预设问答可编辑", "面试前只需选择，不用临时整理"],
    shot: "app-materials",
    alt: "MianXu 资料管理界面",
    caption: "Fig. 07 — 资料管理",
  },
  {
    idx: "07",
    tag: "History",
    title: "历史记录",
    desc: "面试问答与笔试记录完整留存，可重命名、删除、导出 markdown，也能回看复盘报告。",
    facts: ["按场次归档", "导出 markdown", "复盘报告随记录保存"],
    shot: "app-history",
    alt: "MianXu 历史记录界面",
    caption: "Fig. 08 — 历史记录",
  },
];

export default function Features() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray(".feature-row").forEach((row) => {
        const media = row.querySelector(".feature-media");
        gsap.fromTo(
          media,
          { yPercent: 8, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: row, start: "top 82%", once: true },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={ref} className="scroll-mt-24 border-t border-line py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow">03 / 功能</p>
          </div>
          <div className="lg:col-span-9">
            <RevealTitle
              className="display text-[clamp(2.1rem,4.6vw,4.1rem)] text-paper"
              lines={["一个工作台，", "装下整场面试。"]}
            />
          </div>
        </div>

        <div className="mt-16">
          {FEATURES.map((f, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={f.idx}
                className="feature-row grid items-center gap-8 border-t border-line py-12 md:gap-12 md:py-16 lg:grid-cols-12"
              >
                <div
                  className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="numeral text-sm text-brand">{f.idx}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-paper-mute">
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 display text-[clamp(1.7rem,2.6vw,2.3rem)] text-paper">
                    {f.title}
                  </h3>
                  <p className="mt-4 max-w-[42ch] prose-body">{f.desc}</p>

                  <ul className="mt-7 border-t border-line-soft">
                    {f.facts.map((fact) => (
                      <li
                        key={fact}
                        className="border-b border-line-soft py-2.5 font-mono text-[11px] tracking-[0.06em] text-paper-ash"
                      >
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>

                <figure
                  className={`feature-media lg:col-span-6 ${
                    flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"
                  }`}
                >
                  <div className="frame">
                    <Shot name={f.shot} alt={f.alt} className="block w-full" darkOnly={f.darkOnly} />
                  </div>
                  <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-paper-mute">
                    {f.caption}
                  </figcaption>
                </figure>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
