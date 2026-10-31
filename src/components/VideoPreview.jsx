import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "../lib/gsap";

/**
 * 宣传视频预览卡：悬停 3D 倾斜，点击弹出全屏播放（zentry VideoPreview 风格）
 */
export default function VideoPreview() {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef(null);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return undefined;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const cy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      gsap.to(el, {
        duration: 0.6,
        ease: "power3.out",
        transformPerspective: 1200,
        rotateY: cx * 9,
        rotateX: -cy * 7,
        transformStyle: "preserve-3d",
      });
    };
    const onLeave = () => {
      gsap.to(el, { duration: 1, ease: "power3.out", rotateX: 0, rotateY: 0 });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
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
    <div>
      <div
        ref={frameRef}
        onClick={() => setPlaying(true)}
        className="group relative cursor-pointer rounded-2xl border border-snow-50/12 bg-ink-700 p-2 shadow-panel will-change-transform"
      >
        <div className="relative overflow-hidden rounded-xl">
          <video
            src="/videos/mianxu-promo.mp4"
            poster="/videos/poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            className="aspect-video w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-volt">
                Official Promo
              </p>
              <p className="mt-1 font-display text-2xl font-black">MianXu 宣传片</p>
            </div>
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-volt text-xl text-ink transition-transform duration-300 group-hover:scale-110">
              ▶
            </div>
          </div>
        </div>
        {/* 边角装饰 */}
        <span className="absolute -left-1.5 -top-1.5 h-6 w-6 rounded-tl-2xl border-l-2 border-t-2 border-volt" />
        <span className="absolute -bottom-1.5 -right-1.5 h-6 w-6 rounded-br-2xl border-b-2 border-r-2 border-volt" />
      </div>

      {playing &&
        createPortal(
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-xl"
            onClick={() => setPlaying(false)}
          >
            <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <video
                src="/videos/mianxu-promo.mp4"
                controls
                autoPlay
                playsInline
                className="aspect-video w-full rounded-2xl border border-snow-50/10 shadow-glow"
              />
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-snow-75">
                  MianXu · 让每一场面试都有备而来
                </p>
                <button
                  type="button"
                  onClick={() => setPlaying(false)}
                  className="rounded-lg border border-snow-50/20 px-4 py-2 text-sm font-semibold hover:bg-snow-50/10"
                >
                  ✕ 关闭 (Esc)
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
