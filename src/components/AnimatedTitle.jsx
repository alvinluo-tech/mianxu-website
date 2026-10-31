import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

/**
 * 滚动驱动的逐词标题（参考 zentry 的 AnimatedTitle）
 * title: Array<Array<{ text: string, color?: string }>> —— 外层为行，内层为词段
 */
export default function AnimatedTitle({ title, containerClass = "", lineClass = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".animated-word", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 88%",
          end: "bottom 45%",
          scrub: 0.6,
        },
        opacity: 1,
        y: 0,
        rotateX: 0,
        ease: "power2.inOut",
        stagger: 0.05,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={containerClass}>
      {title.map((line, li) => (
        <div key={li} className={`flex flex-wrap gap-x-[0.26em] ${lineClass}`}>
          {line.map((word, wi) => (
            <span
              key={wi}
              className="animated-word"
              style={word.color ? { color: word.color } : undefined}
            >
              {word.text}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
