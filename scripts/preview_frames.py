# -*- coding: utf-8 -*-
"""抽样渲染关键帧到 scripts/preview/，用于快速检查画面效果"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import make_promo as mp  # noqa: E402

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "preview")
os.makedirs(OUT, exist_ok=True)

SAMPLES = [0.8, 2.5, 5.0, 9.8, 12.5, 18.5, 24.5, 28.5, 30.2]
for t in SAMPLES:
    frame = mp.BG.convert("RGBA")
    for fn in mp.SCENES:
        fn(frame, t)
    mp.fade_frame(frame, t)
    name = f"preview_{int(t * 10):03d}.jpg"
    frame.convert("RGB").save(os.path.join(OUT, name), quality=88)
    print("saved", name, flush=True)
print("preview done ->", OUT)
