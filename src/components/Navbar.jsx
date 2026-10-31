import { useEffect, useState } from "react";
import GithubIcon from "./GithubIcon";
import { GITHUB_REPO } from "../lib/constants";

const LINKS = [
  { label: "产品", href: "#about" },
  { label: "宣传视频", href: "#video" },
  { label: "核心功能", href: "#features" },
  { label: "使用场景", href: "#story" },
  { label: "下载", href: "#download" },
  { label: "联系我们", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "border-b border-snow-50/10 bg-ink/80 py-3 backdrop-blur-xl"
            : "bg-transparent py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <img
              src="/img/app-icon.png"
              alt="MianXu 应用图标"
              className="h-9 w-9 rounded-xl shadow-glow ring-1 ring-snow-50/20"
            />
            <span className="font-display text-xl font-black tracking-wide">MIANXU</span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-semibold text-snow-75 transition-colors hover:text-snow"
              >
                {l.label}
              </a>
            ))}
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub 仓库"
              className="grid h-10 w-10 place-items-center rounded-lg border border-snow-50/15 text-snow-75 transition-all hover:border-snow-50/40 hover:text-snow"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="#download"
              className="bg-volt px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-ink transition-all hover:brightness-110 [clip-path:polygon(6%_0,100%_0,94%_100%,0_100%)]"
            >
              ⬇ 下载
            </a>
          </div>

          <button
            type="button"
            aria-label="打开菜单"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-snow-50/15 lg:hidden"
          >
            <span
              className={`h-0.5 w-5 bg-snow transition-transform duration-300 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span className={`h-0.5 w-5 bg-snow transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-5 bg-snow transition-transform duration-300 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* 移动端全屏菜单 */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-ink/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            className="font-display text-4xl font-black text-snow transition-transform hover:scale-105"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            {l.label}
          </a>
        ))}
        <div className="mt-4 flex items-center gap-4">
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub 仓库"
            onClick={() => setMenuOpen(false)}
            className="grid h-12 w-12 place-items-center rounded-xl border border-snow-50/20 text-snow"
          >
            <GithubIcon className="h-6 w-6" />
          </a>
          <a
            href="#download"
            onClick={() => setMenuOpen(false)}
            className="bg-volt px-8 py-3 font-bold uppercase tracking-wider text-ink [clip-path:polygon(6%_0,100%_0,94%_100%,0_100%)]"
          >
            ⬇ 下载
          </a>
        </div>
        <button
          type="button"
          aria-label="关闭菜单"
          onClick={() => setMenuOpen(false)}
          className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-lg border border-snow-50/20 text-xl"
        >
          ✕
        </button>
      </div>
    </>
  );
}
