import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "../lib/gsap";
import { useI18n } from "../i18n";

/**
 * 宣传片预览：细线相框 + 时长标注；点击全屏播放
 */
export default function VideoPreview({ className = "" }) {
  const { t } = useI18n();
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef(null);

  // 悬停时缓慢推近，带惯性质感
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return undefined;
    const media = el.querySelector("video");
    if (!media) return undefined;
    const onEnter = () => gsap.to(media, { scale: 1.03, duration: 1.4, ease: "expo.out" });
    const onLeave = () => gsap.to(media, { scale: 1, duration: 1.4, ease: "expo.out" });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (!playing) return undefined;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setPlaying(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [playing]);

  return (
    <div className={className}>
      <button
        ref={frameRef}
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={t("preview.badge")}
        className="group block w-full text-left"
      >
        <div className="relative overflow-hidden border border-line bg-ink-800">
          <video
            src="/videos/hero-loop.mp4"
            poster="/videos/poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            className="aspect-video w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <span className="absolute start-5 top-5 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.28em] text-paper/80">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {t("preview.badge")}
          </span>
          <span className="absolute bottom-5 end-5 grid h-14 w-14 place-items-center border border-paper/40 text-paper transition-all duration-500 ease-expo group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
            <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-[1px] fill-current">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
        <div className="mt-3 flex items-baseline justify-between border-t border-line-soft pt-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper-mute">
            Official Film
          </span>
          <span className="font-serif text-sm italic text-paper-ash">
            {t("preview.tagline")}
          </span>
        </div>
      </button>

      {playing &&
        createPortal(
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 px-4 py-6 backdrop-blur-sm"
            onClick={() => setPlaying(false)}
          >
            <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <video
                src="/videos/mianxu-promo.mp4"
                controls
                autoPlay
                playsInline
                className="aspect-video w-full border border-line bg-black"
              />
              <div className="mt-4 flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper-ash">
                  MianXu · Official Film · 00:48
                </p>
                <button
                  type="button"
                  onClick={() => setPlaying(false)}
                className="border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                {t("preview.close")}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
