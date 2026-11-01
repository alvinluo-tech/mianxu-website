import RevealTitle from "./RevealTitle";

// 章节取自成片实际内容（_film/mianxu-promo v10），不做推测
const CHAPTERS = [
  ["00:02", "开场：说完，就答"],
  ["00:07", "面试工作台：选好简历与岗位"],
  ["00:12", "实时听译 · 1.6 秒内出参考回答"],
  ["00:22", "模拟面试：追问与复盘"],
  ["00:27", "让每一场面试，都有备而来"],
];

export default function VideoSection() {
  return (
    <section id="video" className="scroll-mt-24 border-t border-line bg-ink-900 py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow">02 / 宣传片</p>
          </div>
          <div className="lg:col-span-9">
            <RevealTitle
              className="display text-[clamp(2.1rem,4.6vw,4.1rem)] text-paper"
              lines={["三十二秒，", "看懂整场面试。"]}
            />
            <p className="mt-8 max-w-[52ch] prose-body">
              从工作台到模拟面试间，从笔试解题到复盘报告。
              一支短片走完 MianXu 陪你的完整流程。
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-9">
            <div className="frame">
              <video
                src="/videos/mianxu-promo.mp4"
                poster="/videos/poster.jpg"
                controls
                preload="metadata"
                playsInline
                className="block aspect-video w-full bg-black"
              />
            </div>
            <div className="mt-3 flex items-baseline justify-between border-t border-line-soft pt-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper-mute">
                MianXu — Official Film
              </span>
              <span className="numeral text-xs text-paper-ash">32″ / 2026</span>
            </div>
          </div>

          {/* 章节表：给视频一个可读的结构 */}
          <ol className="lg:col-span-3">
            {CHAPTERS.map(([t, label]) => (
              <li
                key={t}
                className="flex items-baseline gap-4 border-b border-line-soft py-3.5"
              >
                <span className="numeral shrink-0 text-[11px] text-brand">{t}</span>
                <span className="text-[12.5px] leading-snug text-paper-ash">{label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
