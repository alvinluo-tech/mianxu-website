import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LOCALES, RTL_LOCALES, DEFAULT_LOCALE } from "./locales/index.js";

const KEY = "mianxu-locale";
const I18nCtx = createContext({ locale: DEFAULT_LOCALE, t: (k) => k, setLocale: () => {}, dir: "ltr" });

function fromStorage() {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function fromURL() {
  const q = new URLSearchParams(window.location.search).get("lang");
  return q && LOCALES.some((l) => l.code === q) ? q : null;
}

/** navigator.languages → 最匹配的受支持语言（精确 → 基础语言） */
function fromNavigator() {
  const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  for (const raw of langs) {
    if (!raw) continue;
    const lower = String(raw).toLowerCase();
    const exact = LOCALES.find((l) => l.code.toLowerCase() === lower);
    if (exact) return exact.code;
    const base = lower.split("-")[0];
    // pt 特判到 pt-BR（产品只有巴西方言包）
    const partial = LOCALES.find((l) => l.code.toLowerCase().split("-")[0] === base);
    if (partial) return partial.code;
  }
  return null;
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_LOCALE;
    return fromURL() || fromStorage() || fromNavigator() || DEFAULT_LOCALE;
  });

  useEffect(() => {
    const meta = LOCALES.find((l) => l.code === locale) || LOCALES[0];
    document.documentElement.lang = locale;
    document.documentElement.dir = meta.dir;
    try {
      window.localStorage.setItem(KEY, locale);
    } catch {
      /* 隐私模式忽略 */
    }
  }, [locale]);

  const value = useMemo(() => {
    const dict = LOCALES.find((l) => l.code === locale) || LOCALES[0];
    const fallback = LOCALES.find((l) => l.code === "en");
    const meta = LOCALES.find((l) => l.code === locale) || LOCALES[0];
    const t = (key) => dict.strings[key] ?? (fallback && fallback.strings[key]) ?? key;
    return { locale, setLocale: setLocaleState, t, dir: meta.dir, locales: LOCALES };
  }, [locale]);

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
export { LOCALES, RTL_LOCALES, DEFAULT_LOCALE };
