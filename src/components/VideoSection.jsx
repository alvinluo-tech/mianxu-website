import AnimatedTitle from "./AnimatedTitle";

/**
 * 宣传视频专区：完整内嵌播放器
 */
export default function VideoSection() {
  return (
    <section id="video" className="relative overflow-hidden py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-180px] top-10 h-[460px] w-[460px] rounded-full bg-grape-400/15 blur-[130px]"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="section-tag">Promo Video · 宣传视频</p>
          <AnimatedTitle
            containerClass="game-title justify-center text-center text-4xl sm:text-6xl"
            lineClass="justify-center"
            title={[[{ text: "九十秒，" }, { text: "看懂 MianXu", color: "#D8FF3E" }]]}
          />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-snow-75">
            从面试工作台到模拟面试间，从笔试解题到复盘报告 ——
            一支短片带你看完 MianXu 如何陪你走完整场面试。
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl border border-snow-50/12 bg-ink-700 p-2.5 shadow-panel">
          <video
            src="/videos/mianxu-promo.mp4"
            poster="/videos/poster.jpg"
            controls
            preload="metadata"
            playsInline
            className="aspect-video w-full rounded-2xl bg-ink"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-[0.18em] text-snow-25">
          <span>◆ 面试实时听译</span>
          <span>◆ AI 流式作答</span>
          <span>◆ 模拟面试追问</span>
          <span>◆ 复盘报告</span>
        </div>
      </div>
    </section>
  );
}
