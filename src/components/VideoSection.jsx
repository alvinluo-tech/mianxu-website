import RevealTitle from "./RevealTitle";
import { useI18n } from "../i18n";

// 章节时间取自成片实际内容（_film/mianxu-promo v10），文案随语言切换
const CHAPTER_META = [
  ["00:02", "video.ch1"],
  ["00:08", "video.ch2"],
  ["00:13", "video.ch3"],
  ["00:22", "video.ch4"],
  ["00:27", "video.ch5"],
  ["00:31", "video.ch6"],
];

export default function VideoSection() {
  const { t } = useI18n();

  return (
    <section id="video" className="scroll-mt-24 border-t border-line bg-ink-900 py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow">{t("video.eyebrow")}</p>
          </div>
          <div className="lg:col-span-9">
            <RevealTitle
              className="display text-[clamp(2.1rem,4.6vw,4.1rem)] text-paper"
              lines={[t("video.title1"), t("video.title2")]}
            />
            <p className="mt-8 max-w-[52ch] prose-body">{t("video.desc")}</p>
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
              <span className="numeral text-xs text-paper-ash">48″ / 2026</span>
            </div>
          </div>

          {/* 章节表：给视频一个可读的结构 */}
          <ol className="lg:col-span-3">
            {CHAPTER_META.map(([time, key]) => (
              <li
                key={time}
                className="flex items-baseline gap-4 border-b border-line-soft py-3.5"
              >
                <span className="numeral shrink-0 text-[11px] text-brand">{time}</span>
                <span className="text-[12.5px] leading-snug text-paper-ash">{t(key)}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
