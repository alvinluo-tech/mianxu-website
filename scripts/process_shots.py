# -*- coding: utf-8 -*-
"""把 _capture/raw2_*.png 裁掉顶部更新横幅，输出为官网用的 JPG。

顶部区域：0-42px 为应用自绘标题栏（保留，显示 MianXu 品牌），
42-72px 为「发现新版本」横幅（裁掉），72px 以下为页面内容。
"""
import os
from PIL import Image

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(BASE)
CAP = os.path.join(ROOT, "_capture")
OUT = os.path.join(ROOT, "public", "img", "app")
os.makedirs(OUT, exist_ok=True)

# raw2 名 -> 官网文件名
MAPPING = {
    "raw2_workbench.png": "app-workbench.jpg",
    "raw2_written.png": "app-written.jpg",
    "raw2_mock.png": "app-mock.jpg",
    "raw2_report.png": "app-mock-report.jpg",
    "raw2_bank.png": "app-bank.jpg",
    "raw2_materials.png": "app-materials.jpg",
    "raw2_history.png": "app-history.jpg",
    "raw2_settings.png": "app-settings.jpg",
    "raw2_ai.png": "app-ai.jpg",
}

CROP_TOP = 58  # 深色主题：自绘标题栏(28) + 更新横幅(30) 一并裁掉

for src, dst in MAPPING.items():
    p = os.path.join(CAP, src)
    if not os.path.exists(p):
        print("skip (missing):", src)
        continue
    im = Image.open(p).convert("RGB")
    im = im.crop((0, CROP_TOP, im.width, im.height))
    im.save(os.path.join(OUT, dst), quality=88)
    print("saved:", dst, im.size)
