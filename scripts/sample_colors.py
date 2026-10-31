# -*- coding: utf-8 -*-
"""从真实截图采样产品配色（colour.md §1-2：颜色是找来的）"""
import os
from collections import Counter
from PIL import Image

D = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "_capture")


def top(name, box=None, n=12):
    img = Image.open(os.path.join(D, name)).convert("RGB")
    if box:
        img = img.crop(box)
    px = list(img.getdata())
    c = Counter(px)
    total = len(px)
    print("---", name, "---")
    for rgb, cnt in c.most_common(n):
        print("#%02X%02X%02X" % rgb, round(100.0 * cnt / total, 1), "%")


top("raw2_workbench.png", (0, 72, 1280, 825))
top("raw2_workbench.png", (1000, 640, 1130, 680))  # 开始面试按钮区域
top("raw2_report.png", (0, 72, 1280, 825), 8)
