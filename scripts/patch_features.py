# -*- coding: utf-8 -*-
"""把 Features 的图片换成随主题切换的 Shot 组件"""
import re

p = "src/components/Features.jsx"
s = open(p, encoding="utf-8").read()

if 'import Shot from "./Shot";' not in s:
    s = s.replace(
        'import RevealTitle from "./RevealTitle";',
        'import RevealTitle from "./RevealTitle";\nimport Shot from "./Shot";',
    )

DARK_ONLY = {"app-mock-live", "app-mock-report"}


def repl(m):
    name = m.group(1)
    extra = "\n    darkOnly: true," if name in DARK_ONLY else ""
    return 'shot: "%s",%s' % (name, extra)


s = re.sub(r'img: "/img/app/(app-[a-z-]+)\.jpg",', repl, s)
s = re.sub(
    r'<img\s+src=\{f\.img\}\s+alt=\{f\.alt\}\s+loading="lazy"\s+className="block w-full"\s+/>',
    '<Shot name={f.shot} alt={f.alt} className="block w-full" darkOnly={f.darkOnly} />',
    s,
)

open(p, "w", encoding="utf-8", newline="").write(s)
print("shot:", s.count("shot:"), "darkOnly:", s.count("darkOnly: true"), "Shot tags:", s.count("<Shot"))
