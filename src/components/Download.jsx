import { useEffect, useState } from "react";
import { AppleIcon, WindowsIcon } from "./OSIcons";
import GithubIcon from "./GithubIcon";
import RevealTitle from "./RevealTitle";
import { downloadUrl, latestInfoUrl, GITHUB_REPO, GITHUB_RELEASES } from "../lib/constants";
import { useI18n } from "../i18n";

/** name / 图标固定；meta、说明与按钮文案走 i18n */
const PLATFORMS = [
  {
    key: "windows",
    Icon: WindowsIcon,
    name: "Windows",
    metaKey: "download.winMeta",
    noteKey: "download.winNote",
    items: [
      { key: "win", labelKey: "download.winSetup", meta: "10.8 MB" },
      { key: "win-portable", labelKey: "download.winPortable", meta: "31.4 MB" },
    ],
  },
  {
    key: "macos",
    Icon: AppleIcon,
    name: "macOS",
    metaKey: "download.macMeta",
    noteKey: "download.macNote",
    items: [
      { key: "mac-arm", label: "Apple Silicon", meta: "13.7 MB" },
      { key: "mac-intel", label: "Intel", meta: "15.5 MB" },
    ],
  },
];

function useLatestInfo() {
  const [info, setInfo] = useState(null);
  useEffect(() => {
    const url = latestInfoUrl();
    if (!url) return undefined;
    let alive = true;
    fetch(url)
      .then((r) => r.json())
      .then((d) => alive && d && d.tag && setInfo(d))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return info;
}

export default function Download() {
  const latest = useLatestInfo();
  const { t } = useI18n();

  return (
    <section id="download" className="scroll-mt-24 border-t border-line py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow">{t("download.eyebrow")}</p>
          </div>
          <div className="lg:col-span-9">
            <RevealTitle
              className="display text-[clamp(2.1rem,4.6vw,4.1rem)] text-paper"
              lines={[t("download.title1"), t("download.title2")]}
            />
            <p className="mt-8 max-w-[54ch] prose-body">{t("download.desc")}</p>

            <div className="mt-14 grid max-w-4xl border-t border-line md:grid-cols-2">
              {PLATFORMS.map((p, i) => (
                <div
                  key={p.key}
                  className={`border-b border-line py-10 md:py-12 ${
                    i === 1 ? "md:border-s md:border-line md:ps-10" : "md:pe-10"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <p.Icon className="h-6 w-6 text-paper-ash" />
                    <h3 className="display text-[2.15rem] leading-none text-paper">{p.name}</h3>
                  </div>
                  <p className="mt-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-mute">
                    {t(p.metaKey)}
                  </p>

                  <div className="mt-8 space-y-3">
                    {p.items.map((item) => (
                      <a
                        key={item.key}
                        href={downloadUrl(item.key)}
                        className={`flex items-baseline justify-between px-5 py-4 transition-colors duration-500 ease-expo ${
                          item.labelKey
                            ? "bg-paper text-ink hover:bg-[rgb(var(--text-2))]"
                            : "border border-line text-paper hover:border-paper/50 hover:bg-paper/[0.04]"
                        }`}
                      >
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
                          {item.labelKey ? t(item.labelKey) : item.label}
                        </span>
                        <span
                          className={`font-mono text-[10px] tracking-[0.1em] ${
                            item.labelKey ? "text-ink/60" : "text-paper-mute"
                          }`}
                        >
                          {item.meta}
                        </span>
                      </a>
                    ))}
                  </div>

                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-mute">
                    {t(p.noteKey)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line py-6">
              <div className="flex items-baseline gap-6">
                <a
                  href={GITHUB_REPO}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:text-brand"
                >
                  <GithubIcon className="h-4 w-4" />
                  {t("download.sourceRepo")}
                </a>
                <a
                  href={GITHUB_RELEASES}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline font-mono text-[11px] uppercase tracking-[0.2em] text-paper-ash transition-colors hover:text-paper"
                >
                  {t("download.allReleases")}
                </a>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-mute">
                {latest ? `Latest ${latest.tag}${latest.date ? ` · ${latest.date}` : ""}` : "Latest · GitHub Releases"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
