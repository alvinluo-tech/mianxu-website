import RevealTitle from "./RevealTitle";
import VideoPreview from "./VideoPreview";
import { downloadUrl } from "../lib/constants";
import { useI18n } from "../i18n";

export default function Hero() {
  const { t } = useI18n();

  const specs = [
    ["01", t("hero.spec1k"), t("hero.spec1v")],
    ["02", t("hero.spec2k"), t("hero.spec2v")],
    ["03", t("hero.spec3k"), t("hero.spec3v")],
    ["04", t("hero.spec4k"), t("hero.spec4v")],
  ];

  return (
    <section id="hero" className="relative overflow-hidden pt-[132px]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-lines opacity-[0.35]" />
        <div className="absolute left-1/2 top-[-260px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-brand/[0.07] blur-[160px]" />
      </div>

      <div className="wrap relative">
        {/* 报头线 */}
        <div className="flex items-baseline justify-between border-b border-line pb-5">
          <span className="eyebrow">{t("hero.eyebrow")}</span>
        </div>

        <div className="grid grid-cols-1 items-end gap-14 pb-16 pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-20">
          <div className="lg:col-span-7">
            <RevealTitle
              as="h1"
              scroll={false}
              delay={0.25}
              className="display text-[clamp(2.9rem,7.2vw,6.4rem)] text-paper"
              lines={[t("hero.title1"), t("hero.title2")]}
            />

            <p className="mt-9 max-w-[44ch] prose-body">{t("hero.desc")}</p>

            <div className="mt-11 flex flex-wrap items-center gap-4">
              <a
                href={downloadUrl("win")}
                className="inline-flex items-center bg-paper px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors duration-500 ease-expo hover:bg-[rgb(var(--text-2))]"
              >
                {t("hero.ctaDownload")}
              </a>
              <a
                href="#video"
                className="inline-flex items-center border border-line px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-paper transition-colors duration-500 ease-expo hover:border-paper/50 hover:bg-paper/[0.04]"
              >
                {t("hero.ctaFilm")}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <VideoPreview />
          </div>
        </div>
      </div>

      {/* 规格条 */}
      <div className="wrap relative">
        <dl className="grid grid-cols-2 border-t border-line sm:grid-cols-4">
          {specs.map(([idx, k, v], i) => (
            <div
              key={idx}
              className={`flex items-baseline gap-3 py-6 ${
                i !== 0 ? "sm:border-s sm:border-line-soft sm:ps-6" : ""
              } ${i % 2 === 1 ? "border-s border-line-soft ps-5 sm:ps-6" : ""} ${
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
