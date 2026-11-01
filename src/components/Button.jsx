const VARIANTS = {
  // 纸白实底：页面唯一的高对比动作
  solid: "bg-paper text-ink hover:bg-white",
  // 细线描边：次级动作
  outline: "border border-line text-paper hover:border-paper/50 hover:bg-paper/[0.04]",
  // 赤陶：全站只留给最重要的那一处
  accent: "bg-brand text-paper hover:bg-brand-light",
};

/**
 * 矩形按钮：无箭头、无斜切，靠字距与留白
 */
export default function Button({
  children,
  variant = "solid",
  href,
  className = "",
  onClick,
  external = false,
}) {
  const cls = [
    "inline-flex items-center justify-center gap-2.5 px-8 py-4",
    "font-mono text-[11px] font-medium uppercase tracking-[0.22em]",
    "transition-colors duration-500 ease-expo",
    VARIANTS[variant],
    className,
  ].join(" ");

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
