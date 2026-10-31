import { useRef } from "react";
import { gsap } from "../lib/gsap";

/**
 * 鼠标跟随 3D 倾斜容器（zentry BentoTilt）
 */
export default function BentoTilt({ children, className = "", max = 9 }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const cy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    gsap.to(ref.current, {
      duration: 0.5,
      ease: "power3.out",
      transformPerspective: 999,
      rotateX: -cy * max,
      rotateY: cx * (max + 2),
      transformStyle: "preserve-3d",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current, {
      duration: 1,
      ease: "power3.out",
      rotateX: 0,
      rotateY: 0,
      transformStyle: "preserve-3d",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </div>
  );
}
