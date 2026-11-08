import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n";

/**
 * 语言切换下拉：展示原生语言名，当前项打勾。
 * t('nav.menu') 用作 aria-label；面板滚动以容纳 23 种语言。
 */
export default function LanguageSwitcher({ compact = false }) {
  const { locale, setLocale, locales } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const current = locales.find((l) => l.code === locale) || locales[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={current.name}
        className={`flex h-9 items-center gap-2 border border-line px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-ash transition-colors duration-500 ease-expo hover:border-paper/40 hover:text-paper ${
          compact ? "" : "sm:px-3.5"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
        </svg>
        <span className="hidden sm:inline">{current.name}</span>
        <span className="sm:hidden">{current.code.toUpperCase()}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={current.name}
          className="absolute end-0 top-full z-50 mt-2 max-h-[min(26rem,60vh)] w-52 overflow-auto border border-line bg-ink-800 py-1 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)]"
        >
          {locales.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === locale}
                onClick={() => {
                  setLocale(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-baseline justify-between gap-3 px-4 py-2 text-left text-[13px] transition-colors hover:bg-paper/[0.06] ${
                  l.code === locale ? "text-brand" : "text-paper-ash"
                }`}
              >
                <span>{l.name}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-paper-mute">
                  {l.code}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
