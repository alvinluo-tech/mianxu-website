import { useState } from "react";
import RevealTitle from "./RevealTitle";
import { downloadUrl } from "../lib/constants";
import { detectTarget } from "../lib/detectTarget";
import { useI18n } from "../i18n";

function detectOS() {
  if (typeof navigator === "undefined") return "other";
  return detectTarget({
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    maxTouchPoints: navigator.maxTouchPoints || 0,
  });
}

const LABEL_KEYS = {
  win: "contact.labelWin",
  "mac-arm": "contact.labelMac",
  other: "contact.labelOther",
};

const NOTE_KEYS = {
  win: "contact.noteWin",
  "mac-arm": "contact.noteMac",
  other: "contact.noteOther",
};

export default function Contact() {
  const { t } = useI18n();
  const [os] = useState(detectOS);

  return (
    <section id="contact" className="scroll-mt-24 border-t border-line py-28 md:py-40">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <RevealTitle
              className="display text-[clamp(2.6rem,6.4vw,5.6rem)] text-paper"
              lines={[t("contact.title1"), t("contact.title2")]}
            />
          </div>
          <div className="lg:col-span-4">
            <p className="prose-body">{t("contact.desc")}</p>
            <div className="mt-8">
              <a
                href={os === "other" ? "#download" : downloadUrl(os)}
                className="inline-flex items-center bg-brand px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-brand-contrast transition-colors duration-500 ease-expo hover:bg-brand-light"
              >
                {t(LABEL_KEYS[os])}
              </a>
            </div>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper-mute">
              {t(NOTE_KEYS[os])}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
