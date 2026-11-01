import { useEffect, useState } from "react";
import GithubIcon from "./GithubIcon";
import { GITHUB_REPO, downloadUrl } from "../lib/constants";

const LINKS = [
  { label: "产品", href: "#about" },
  { label: "宣传片", href: "#video" },
  { label: "功能", href: "#features" },
  { label: "原则", href: "#story" },
  { label: "下载", href: "#download" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-expo ${
          scrolled
            ? "border-b border-line-soft bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav
          className={`wrap flex items-center justify-between transition-all duration-500 ease-expo ${
            scrolled ? "h-[68px]" : "h-[92px]"
          }`}
        >
          <a href="#top" className="flex items-baseline gap-3">
            <span className="font-serif text-[22px] italic leading-none tracking-tight text-paper">
              MianXu
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.32em] text-paper-mute sm:block">
              面试工作台
            </span>
          </a>

          <div className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-underline font-mono text-[11px] uppercase tracking-[0.2em] text-paper-ash transition-colors duration-300 hover:text-paper"
              >
                {l.label}
              </a>
            ))}
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub 仓库"
              className="text-paper-ash transition-colors duration-300 hover:text-paper"
            >
              <GithubIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href="#download"
              className="border border-paper/70 px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors duration-500 ease-expo hover:bg-paper hover:text-ink"
            >
              下载
            </a>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 flex-col items-end justify-center gap-[6px] lg:hidden"
          >
            <span
              className={`h-px bg-paper transition-all duration-500 ease-expo ${
                menuOpen ? "w-6 translate-y-[3.5px] rotate-45" : "w-6"
              }`}
            />
            <span
              className={`h-px bg-paper transition-all duration-500 ease-expo ${
                menuOpen ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-4"
              }`}
            />
          </button>
        </nav>
      </header>

      {/* 移动端菜单：大字号 + 编号 */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-ink px-8 transition-all duration-500 ease-expo lg:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-baseline gap-5 border-b border-line-soft py-6"
            >
              <span className="numeral text-sm text-brand">0{i + 1}</span>
              <span className="display text-4xl text-paper">{l.label}</span>
            </a>
          ))}
        </nav>
        <div className="mt-10 flex items-center gap-6">
          <a
            href={downloadUrl("win")}
            className="bg-paper px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink"
          >
            下载桌面端
          </a>
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub 仓库"
            className="text-paper-ash"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </>
  );
}
