import RevealTitle from "./RevealTitle";
import Shot from "./Shot";
import { useI18n } from "../i18n";

const PRINCIPLES = ["p1", "p2", "p3", "p4"];

export default function Story() {
  const { t } = useI18n();

  return (
    <section id="story" className="scroll-mt-24 border-t border-line py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow">{t("story.eyebrow")}</p>
          </div>
          <div className="lg:col-span-9">
            <RevealTitle
              className="display text-[clamp(2.1rem,4.6vw,4.1rem)] text-paper"
              lines={[t("story.title1"), t("story.title2")]}
            />
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2">
              {PRINCIPLES.map((key, i) => (
                <div
                  key={key}
                  className={`border-t border-line py-7 ${
                    i % 2 === 1 ? "sm:border-s sm:border-line sm:ps-8" : ""
                  }`}
                >
                  <span className="numeral text-sm text-brand">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-bold tracking-tight text-paper">
                    {t(`story.${key}t`)}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-[1.8] text-paper-ash">
                    {t(`story.${key}d`)}
                  </p>
                </div>
              ))}
            </div>

            <blockquote className="mt-10 border-s border-brand ps-6">
              <p className="font-serif text-[1.35rem] italic leading-relaxed text-paper/90">
                {t("story.quote")}
              </p>
            </blockquote>
          </div>

          <figure className="lg:col-span-5">
            <div className="frame">
              <Shot
                name="app-settings"
                alt={t("story.p1t")}
                className="block w-full"
              />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between border-t border-line-soft pt-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper-mute">
                Fig. 08 — {t("download.sourceRepo") === "源码仓库" ? "连接你的 AI" : "Connect your AI"}
              </span>
              <span className="font-serif text-xs italic text-paper-ash">BYOK</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
