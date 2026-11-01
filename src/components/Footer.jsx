import { GITHUB_REPO } from "../lib/constants";

const NAV = [
  { label: "产品", href: "#about" },
  { label: "宣传片", href: "#video" },
  { label: "功能", href: "#features" },
  { label: "原则", href: "#story" },
  { label: "下载", href: "#download" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <a href="#top" className="flex items-center gap-3">
              <img
                src="/img/app-icon.png"
                alt="MianXu 应用图标"
                className="h-8 w-8 rounded-[8px]"
              />
              <span className="font-serif text-[22px] italic leading-none text-paper">
                MianXu
              </span>
            </a>
            <p className="mt-5 max-w-[40ch] text-[13px] leading-[1.8] text-paper-ash">
              本地优先的 AI 面试工作台。实时听译与作答、笔试截屏解题、模拟面试与复盘报告。
            </p>
            <p className="mt-6 font-serif text-sm italic text-paper-ash">
              Let every interview be prepared.
            </p>
          </div>

          <nav className="md:col-span-4">
            <h4 className="eyebrow">目录</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[13px] text-paper-ash transition-colors hover:text-paper"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={GITHUB_REPO}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] text-paper-ash transition-colors hover:text-paper"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-line-soft">
        <div className="wrap flex flex-wrap items-baseline justify-between gap-3 py-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-mute">
            © 2026 MianXu
          </p>
          <a
            href="#top"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-mute transition-colors hover:text-paper"
          >
            回到顶部
          </a>
        </div>
      </div>
    </footer>
  );
}
