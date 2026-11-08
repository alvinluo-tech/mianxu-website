import { GITHUB_REPO } from "../lib/constants";
import { useI18n } from "../i18n";

const NAV = [
  { key: "nav.product", href: "#about" },
  { key: "nav.film", href: "#video" },
  { key: "nav.features", href: "#features" },
  { key: "nav.principles", href: "#story" },
  { key: "nav.download", href: "#download" },
];

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-line">
      <div className="wrap py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <a href="#top" className="flex items-center gap-3">
              <img
                src="/img/app-icon.png"
                alt="MianXu"
                className="h-8 w-8 rounded-[8px]"
              />
              <span className="font-serif text-[22px] italic leading-none text-paper">
                MianXu
              </span>
            </a>
            <p className="mt-5 max-w-[40ch] text-[13px] leading-[1.8] text-paper-ash">
              {t("footer.tagline")}
            </p>
            <p className="mt-6 font-serif text-sm italic text-paper-ash">
              Let every interview be prepared.
            </p>
          </div>

          <nav className="md:col-span-4">
            <h4 className="eyebrow">{t("footer.group")}</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[13px] text-paper-ash transition-colors hover:text-paper"
                  >
                    {t(l.key)}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={GITHUB_REPO}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] text-paper-ash transition-colors hover:text-paper"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-line-soft">
        <div className="wrap flex flex-wrap items-baseline justify-between gap-3 py-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-mute">
            © 2026 MianXu
          </p>
          <a
            href="#top"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-mute transition-colors hover:text-paper"
          >
            {t("footer.backToTop")}
          </a>
        </div>
      </div>
    </footer>
  );
}
