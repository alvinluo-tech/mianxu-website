import RevealTitle from "./RevealTitle";

const STATS = [
  ["08", "功能模块", "工作台 / 笔试 / 模拟 / 题库 / 资料 / 历史"],
  ["18", "全局热键", "滚动、答题、截屏、移动，全键盘完成"],
  ["100%", "数据本地", "AI 接口由你自己配置，记录不离开本机"],
];

export default function About() {
  return (
    <section id="about" className="wrap scroll-mt-24 py-24 md:py-36">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="eyebrow">01 / 产品</p>
        </div>

        <div className="lg:col-span-9">
          <RevealTitle
            className="display text-[clamp(2.1rem,4.6vw,4.1rem)] text-paper"
            lines={["把面试准备，", "做成一门手艺。"]}
          />

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="prose-body">
                MianXu 是一款本地优先的 AI 面试工作台。面试时实时听译并给出参考回答，
                笔试时截屏识别题目，模拟面试里 AI 面试官按你的简历与岗位出题、追问、换题。
              </p>
              <p className="prose-body mt-5">
                每一场练习都沉淀为复盘报告；每一份简历、岗位与预设问答都留在你自己的电脑上。
                工具越强，越应该把控制权交还给使用者。
              </p>
            </div>

            <dl className="border-t border-line">
              {STATS.map(([n, k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline gap-6 border-b border-line-soft py-5"
                >
                  <dt className="numeral w-[5.4rem] shrink-0 text-[2.2rem] leading-none text-paper">
                    {n}
                  </dt>
                  <dd>
                    <span className="text-[13px] font-semibold text-paper">{k}</span>
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-paper-mute">
                      {v}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="mt-16">
            <div className="frame">
              <img
                src="/img/app/app-workbench.jpg"
                alt="MianXu 面试工作台界面"
                loading="lazy"
                className="block w-full"
              />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between border-t border-line-soft pt-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper-mute">
                Fig. 01 — 面试工作台
              </span>
              <span className="font-serif text-xs italic text-paper-ash">
                Interview Workbench
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
