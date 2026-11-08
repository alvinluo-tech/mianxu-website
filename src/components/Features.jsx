import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import RevealTitle from "./RevealTitle";
import Shot from "./Shot";
import { useI18n } from "../i18n";

/* tag 为拉丁设计元素（保留英文）；文案全部走 i18n */
const FEATURE_META = [
  { idx: "01", tag: "Interview", shot: "app-workbench", darkOnly: false },
  { idx: "02", tag: "Mock Room", shot: "app-mock-live", darkOnly: true },
  { idx: "03", tag: "Review", shot: "app-mock-report", darkOnly: true },
  { idx: "04", tag: "Free Chat", shot: "app-ai", darkOnly: false },
  { idx: "05", tag: "Question Bank", shot: "app-bank", darkOnly: false },
  { idx: "06", tag: "Assets", shot: "app-materials", darkOnly: false },
  { idx: "07", tag: "History", shot: "app-history", darkOnly: false },
];

export default function Features() {
  const ref = useRef(null);
  const { t } = useI18n();

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
            <p className="eyebrow">{t("features.eyebrow")}</p>
          </div>
          <div className="lg:col-span-9">
            <RevealTitle
              className="display text-[clamp(2.1rem,4.6vw,4.1rem)] text-paper"
              lines={[t("features.title1"), t("features.title2")]}
            />
          </div>
        </div>

        <div className="mt-16">
          {FEATURE_META.map((meta, i) => {
            const flip = i % 2 === 1;
            const n = meta.idx;
            const title = t(`features.i${Number(n)}title`);
            const desc = t(`features.i${Number(n)}desc`);
            const facts = [
              t(`features.i${Number(n)}f1`),
              t(`features.i${Number(n)}f2`),
              t(`features.i${Number(n)}f3`),
            ];
            const alt = `MianXu ${title}`;
            return (
              <article
                key={meta.idx}
                className="feature-row grid items-center gap-8 border-t border-line py-12 md:gap-12 md:py-16 lg:grid-cols-12"
              >
                <div
                  className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="numeral text-sm text-brand">{meta.idx}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-paper-mute">
                      {meta.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 display text-[clamp(1.7rem,2.6vw,2.3rem)] text-paper">
                    {title}
                  </h3>
                  <p className="mt-4 max-w-[42ch] prose-body">{desc}</p>

                  <ul className="mt-7 border-t border-line-soft">
                    {facts.map((fact) => (
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
                    <Shot name={meta.shot} alt={alt} className="block w-full" darkOnly={meta.darkOnly} />
                  </div>
                  <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-paper-mute">
                    {`Fig. ${Number(meta.idx) + 1} — ${title}`}
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
