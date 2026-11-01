import RevealTitle from "./RevealTitle";
import VideoPreview from "./VideoPreview";
import { downloadUrl } from "../lib/constants";

const SPECS = [
  ["01", "本地优先", "数据不出本机"],
  ["02", "8 大模块", "面试 / 笔试 / 模拟"],
  ["03", "18 个热键", "全键盘掌控"],
  ["04", "自带接口", "多供应商 BYOK"],
];

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-[132px]">
      {/* 极轻的暖光与网格，作为版面呼吸，不做任何霓虹装饰 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-lines opacity-[0.35]" />
        <div className="absolute left-1/2 top-[-260px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[#15AEF2]/[0.07] blur-[160px]" />
      </div>

      <div className="wrap relative">
        {/* 报头线 */}
        <div className="flex items-baseline justify-between border-b border-line pb-5">
          <span className="eyebrow">AI 面试工作台 · 本地优先</span>
        </div>

        <div className="grid grid-cols-1 items-end gap-14 pb-16 pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-20">
          <div className="lg:col-span-7">
            <RevealTitle
              as="h1"
              scroll={false}
              delay={0.25}
              className="display text-[clamp(2.9rem,7.2vw,6.4rem)] text-paper"
              lines={["让每一场面试", "都有备而来。"]}
            />

            <p className="mt-9 max-w-[44ch] prose-body">
              面试实时听译与作答、笔试截屏解题、模拟面试动态对话与复盘报告。
              AI 能力对接你自己的接口，所有数据留在这台电脑上。
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-4">
              <a
                href={downloadUrl("win")}
                className="inline-flex items-center bg-paper px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors duration-500 ease-expo hover:bg-[rgb(var(--text-2))]"
              >
                下载桌面端
              </a>
              <a
                href="#video"
                className="inline-flex items-center border border-line px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-paper transition-colors duration-500 ease-expo hover:border-paper/50 hover:bg-paper/[0.04]"
              >
                观看宣传片
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <VideoPreview />
          </div>
        </div>
      </div>

      {/* 规格条：一屏内交代清楚四件差异化事实 */}
      <div className="wrap relative">
        <dl className="grid grid-cols-2 border-t border-line sm:grid-cols-4">
          {SPECS.map(([idx, k, v], i) => (
            <div
              key={k}
              className={`flex items-baseline gap-3 py-6 ${
                i !== 0 ? "sm:border-l sm:border-line-soft sm:pl-6" : ""
              } ${i % 2 === 1 ? "border-l border-line-soft pl-5 sm:pl-6" : ""} ${
                i > 1 ? "border-t border-line-soft sm:border-t-0" : ""
              }`}
            >
              <span className="numeral text-xs text-brand">{idx}</span>
              <div>
                <dt className="text-[13px] font-semibold text-paper">{k}</dt>
                <dd className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper-mute">
                  {v}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
