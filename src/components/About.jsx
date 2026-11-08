import RevealTitle from "./RevealTitle";
import Shot from "./Shot";
import { useI18n } from "../i18n";

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="wrap scroll-mt-24 py-24 md:py-36">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="eyebrow">{t("about.eyebrow")}</p>
        </div>

        <div className="lg:col-span-9">
          <RevealTitle
            className="display text-[clamp(2.1rem,4.6vw,4.1rem)] text-paper"
            lines={[t("about.title1"), t("about.title2")]}
          />

          <div className="mt-12 max-w-[62ch]">
            <p className="prose-body">{t("about.p1")}</p>
            <p className="prose-body mt-5">{t("about.p2")}</p>
          </div>

          <figure className="mt-14">
            <div className="frame">
              <Shot
                name="app-workbench"
                alt={t("about.figcap")}
                className="block w-full"
                eager
              />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between border-t border-line-soft pt-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper-mute">
                {t("about.figcap")}
              </span>
              <span className="font-serif text-xs italic text-paper-ash">
                Interview Workbench
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
