const VARIANTS = {
  volt: "bg-volt text-ink hover:brightness-110",
  grape: "bg-grape-400 text-snow hover:bg-grape-300",
  outline: "border border-snow-50/30 text-snow hover:bg-snow-50/10",
};

/**
 * 斜切角按钮（zentry 风格 clip-path）
 */
export default function Button({ children, variant = "volt", href, className = "", onClick, external = false }) {
  const cls = [
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em]",
    "transition-all duration-300",
    "[clip-path:polygon(6%_0,100%_0,94%_100%,0_100%)]",
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
