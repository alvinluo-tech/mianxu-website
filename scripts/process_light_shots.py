# -*- coding: utf-8 -*-
"""把 _capture/light-*.png 裁掉系统标题栏，输出为官网浅色版截图"""
import os
from PIL import Image

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(BASE)
CAP = os.path.join(ROOT, "_capture")
OUT = os.path.join(ROOT, "public", "img", "app")

PAIRS = {
    "light-workbench.png": "app-workbench-light.jpg",
    "light-written.png": "app-written-light.jpg",
    "light-mock.png": "app-mock-light.jpg",
    "light-ai.png": "app-ai-light.jpg",
    "light-bank.png": "app-bank-light.jpg",
    "light-materials.png": "app-materials-light.jpg",
    "light-history.png": "app-history-light.jpg",
    "light-settings.png": "app-settings-light.jpg",
}

for src, dst in PAIRS.items():
    p = os.path.join(CAP, src)
    if not os.path.exists(p):
        print("skip", src)
        continue
    im = Image.open(p).convert("RGB")
    im = im.crop((0, 34, im.width, im.height))
    im.save(os.path.join(OUT, dst), quality=90)
    print("saved", dst, im.size)
