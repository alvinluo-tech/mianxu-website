import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

/**
 * 行掩膜标题：每行从下方推入，expoOut 收尾（有质量感，不是淡入）
 * lines: ReactNode[] —— 每个元素渲染为一行
 */
export default function RevealTitle({
  lines,
  className = "",
  as: Tag = "h2",
  delay = 0,
  scroll = true,
  stagger = 0.09,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray(".line-mask > span");
      if (!targets.length) return;

      const anim = {
        yPercent: 0,
        duration: 1.15,
        ease: "expo.out",
        stagger,
        delay,
      };

      if (scroll) {
        gsap.fromTo(
          targets,
          { yPercent: 150 },
          {
            ...anim,
            scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
          }
        );
      } else {
        gsap.fromTo(targets, { yPercent: 150 }, anim);
      }
    }, ref);
    return () => ctx.revert();
  }, [delay, scroll, stagger]);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
