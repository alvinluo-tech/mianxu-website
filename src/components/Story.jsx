import RevealTitle from "./RevealTitle";

const PRINCIPLES = [
  {
    idx: "01",
    title: "数据留在本机",
    body: "简历、岗位、记录与会话都保存在本地；AI 请求直接发往你配置的服务商，不经过我们。",
  },
  {
    idx: "02",
    title: "模型由你决定",
    body: "作答、识题、听译、语音可分别绑定不同供应商与模型，换模型不用换工具。",
  },
  {
    idx: "03",
    title: "键盘先于鼠标",
    body: "18 个全局动作热键加形态各异的浮窗，不打断你正在做的事。",
  },
  {
    idx: "04",
    title: "复盘驱动进步",
    body: "练习的价值在于回看。每场模拟都留下可检索的复盘，而不是一次性对话。",
  },
];

export default function Story() {
  return (
    <section id="story" className="scroll-mt-24 border-t border-line py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow">04 / 原则</p>
          </div>
          <div className="lg:col-span-9">
            <RevealTitle
              className="display text-[clamp(2.1rem,4.6vw,4.1rem)] text-paper"
              lines={["工具应该懂面试，", "更该懂你。"]}
            />
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2">
              {PRINCIPLES.map((p, i) => (
                <div
                  key={p.idx}
                  className={`border-t border-line py-7 ${
                    i % 2 === 1 ? "sm:border-l sm:border-line sm:pl-8" : ""
                  }`}
                >
                  <span className="numeral text-sm text-brand">{p.idx}</span>
                  <h3 className="mt-3 text-lg font-bold tracking-tight text-paper">{p.title}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-[1.8] text-paper-ash">{p.body}</p>
                </div>
              ))}
            </div>

            <blockquote className="mt-10 border-l border-brand pl-6">
              <p className="font-serif text-[1.35rem] italic leading-relaxed text-paper/90">
                “界面越安静，注意力越值钱。”
              </p>
              <footer className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-paper-mute">
                MianXu Design Principle
              </footer>
            </blockquote>
          </div>

          <figure className="lg:col-span-5">
            <div className="frame">
              <img
                src="/img/app/app-settings.jpg"
                alt="MianXu 设置与 AI 服务界面"
                loading="lazy"
                className="block w-full"
              />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between border-t border-line-soft pt-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper-mute">
                Fig. 08 — 连接你的 AI
              </span>
              <span className="font-serif text-xs italic text-paper-ash">BYOK</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
