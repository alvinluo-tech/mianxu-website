# -*- coding: utf-8 -*-
"""
MianXu 宣传视频生成脚本
- 用 Pillow 逐帧渲染 1280x720@30fps 动效，嵌入真实应用截图（public/img/app/*.jpg）
- 用 ffmpeg 编码为 public/videos/mianxu-promo.mp4，并派生 hero-loop.mp4 / poster.jpg
用法: python scripts/make_promo.py
"""
import math
import os
import shutil
import subprocess

from PIL import Image, ImageDraw, ImageFilter, ImageFont

BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(BASE)
FRAMES = os.path.join(BASE, "frames")
VIDDIR = os.path.join(ROOT, "public", "videos")
IMGDIR = os.path.join(ROOT, "public", "img", "app")

W, H, FPS = 1280, 720, 30
DUR = 31.0
TOTAL = int(DUR * FPS)

# 色板与官网一致：藏青黑 / 冷白 / 单一青蓝点缀（采样自产品界面）
INK = (10, 15, 25)
PANEL = (19, 25, 41)
SNOW = (232, 236, 244)
SNOW50 = (138, 147, 166)
SNOW25 = (91, 100, 120)
GRAPE = (10, 110, 158)  # 品牌深
GRAPE_L = (21, 174, 242)  # 品牌青蓝
VOLT = (79, 195, 247)  # 青蓝浅：下划线 / 勾选 / 强调
SHOTS = ["app-workbench.jpg", "app-mock.jpg", "app-mock-report.jpg"]


# ---------------------------------------------------------------- fonts
def _font(candidates, size):
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()


F_ZH_B = ["C:/Windows/Fonts/msyhbd.ttc", "C:/Windows/Fonts/simhei.ttf"]
F_ZH = ["C:/Windows/Fonts/msyh.ttc", "C:/Windows/Fonts/simhei.ttf"]
F_EN = ["C:/Windows/Fonts/segoeuib.ttf", "C:/Windows/Fonts/arialbd.ttf"]
F_EN_BLK = ["C:/Windows/Fonts/seguibl.ttf", "C:/Windows/Fonts/segoeuib.ttf", "C:/Windows/Fonts/arialbd.ttf"]


def zh_b(size):
    return _font(F_ZH_B, size)


def zh(size):
    return _font(F_ZH, size)


def en(size):
    return _font(F_EN, size)


def en_blk(size):
    return _font(F_EN_BLK, size)


# ---------------------------------------------------------------- easing
def clamp01(x):
    return max(0.0, min(1.0, x))


def seg(t, a, b):
    if b <= a:
        return 1.0 if t >= b else 0.0
    return clamp01((t - a) / (b - a))


def ease_out_cubic(t):
    return 1 - (1 - t) ** 3


def ease_out_expo(t):
    return 1.0 if t >= 1 else 1 - math.pow(2, -10 * t)


def ease_in_out(t):
    return t * t * (3 - 2 * t)


# ---------------------------------------------------------------- static bg
def build_bg():
    img = Image.new("RGB", (W, H))
    top, bottom = (14, 17, 26), (6, 8, 13)
    d = ImageDraw.Draw(img)
    for y in range(H):
        k = y / (H - 1)
        c = tuple(int(top[i] + (bottom[i] - top[i]) * k) for i in range(3))
        d.line([(0, y), (W, y)], fill=c)

    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([240, -260, 1040, 260], fill=GRAPE + (52,))
    gd.ellipse([-260, 420, 320, 900], fill=(18, 58, 82, 120))
    gd.ellipse([980, 460, 1560, 900], fill=(26, 80, 110, 90))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    img = Image.alpha_composite(img.convert("RGBA"), glow)

    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gg = ImageDraw.Draw(grid)
    for x in range(0, W, 80):
        gg.line([(x, 0), (x, H)], fill=(223, 223, 240, 6))
    for y in range(0, H, 80):
        gg.line([(0, y), (W, y)], fill=(223, 223, 240, 6))
    img = Image.alpha_composite(img, grid)
    return img.convert("RGB")


BG = build_bg()


def load_shots():
    out = {}
    for name in SHOTS:
        p = os.path.join(IMGDIR, name)
        if os.path.exists(p):
            im = Image.open(p).convert("RGB")
            # 统一到 1600 宽，给 Ken Burns 留出裁切余量
            ratio = 1600 / im.width
            out[name] = im.resize((1600, max(1, int(im.height * ratio))), Image.Resampling.LANCZOS)
    return out


SHOTS_IMGS = load_shots()


# ---------------------------------------------------------------- helpers
def tracked_text(d, cx, y, s, f, fill, tracking=8):
    """水平居中的字距文本"""
    widths = []
    for ch in s:
        if ch == " ":
            widths.append(f.size * 0.35)
        else:
            b = d.textbbox((0, 0), ch, font=f)
            widths.append(b[2] - b[0])
    total = sum(widths) + tracking * (len(s) - 1)
    x = cx - total / 2
    for ch, w in zip(s, widths):
        d.text((x, y), ch, font=f, fill=fill)
        x += w + tracking
    return total


def new_layer():
    return Image.new("RGBA", (W, H), (0, 0, 0, 0))


def ken_burns(img, t01, zoom_from=1.0, zoom_to=1.12, pan=(0.0, 0.0)):
    w, h = img.size
    z = zoom_from + (zoom_to - zoom_from) * ease_in_out(clamp01(t01))
    cw, ch = int(w / z), int(h / z)
    x0 = int((w - cw) / 2 + pan[0] * (w - cw) / 2 * 0.9)
    y0 = int((h - ch) / 2 + pan[1] * (h - ch) / 2 * 0.9)
    return img.crop((x0, y0, x0 + cw, y0 + ch)).resize((w, h), Image.Resampling.LANCZOS)


def draw_shot_window(frame, img, box, entry, shadow_off=(8, 14)):
    """带标题栏窗口 + 圆角截图内容，entry 为 0-1 的入场进度"""
    if img is None or entry <= 0:
        return
    a = int(255 * ease_out_cubic(entry))
    x0, y0, x1, y1 = box
    sc = 0.96 + 0.04 * ease_out_cubic(entry)

    # 阴影
    sh = new_layer()
    sd = ImageDraw.Draw(sh)
    sd.rounded_rectangle(
        [x0 + shadow_off[0], y0 + shadow_off[1], x1 + shadow_off[0], y1 + shadow_off[1]],
        radius=18,
        fill=(0, 0, 0, int(110 * entry)),
    )
    sh = sh.filter(ImageFilter.GaussianBlur(16))
    frame.alpha_composite(sh)

    # 以窗口中心缩放入场
    win = new_layer()
    wd = ImageDraw.Draw(win)
    wd.rounded_rectangle(box, radius=16, fill=PANEL + (a,), outline=SNOW25 + (a,), width=1)
    # 标题栏
    for i, c in enumerate([(255, 95, 86), (255, 189, 46), (39, 201, 63)]):
        wd.ellipse([x0 + 24 + i * 26, y0 + 15, x0 + 36 + i * 26, y0 + 27], fill=c + (a,))
    wd.rounded_rectangle([x0 + 116, y0 + 12, x1 - 116, y0 + 32], radius=10, fill=(10, 15, 25, a))

    # 内容截图
    cx0, cy0, cx1, cy1 = x0 + 10, y0 + 42, x1 - 10, y1 - 10
    cw, ch = int(cx1 - cx0), int(cy1 - cy0)
    target_ratio = cw / ch
    iw, ih = img.size
    src_ratio = iw / ih
    if src_ratio > target_ratio:
        nh = ih
        nw = int(ih * target_ratio)
        sx = (iw - nw) // 2
        crop = img.crop((sx, 0, sx + nw, ih))
    else:
        nw = iw
        nh = int(iw / target_ratio)
        sy = (ih - nh) // 2
        crop = img.crop((0, sy, iw, sy + nh))
    content = crop.resize((cw, ch), Image.Resampling.LANCZOS).convert("RGBA")
    mask = Image.new("L", (cw, ch), 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle([0, 0, cw - 1, ch - 1], radius=10, fill=255)
    win.paste(content, (cx0, cy0), mask)

    if sc < 0.999:
        win = win.resize((int(W * sc), int(H * sc)), Image.Resampling.BILINEAR)
        wx = (W - win.width) // 2
        wy = (H - win.height) // 2
        frame.alpha_composite(win, (wx, wy))
    else:
        frame.alpha_composite(win)


def caption(frame, x, y, text, t01, accent=VOLT):
    """弹出式字幕标注"""
    if t01 <= 0:
        return
    a = int(255 * ease_out_cubic(t01))
    dy = int((1 - ease_out_cubic(t01)) * 26)
    f = zh_b(22)
    layer = new_layer()
    d = ImageDraw.Draw(layer)
    tw = d.textbbox((0, 0), text, font=f)[2]
    bw = tw + 58
    bh = 44
    d.rounded_rectangle([x, y + dy, x + bw, y + dy + bh], radius=10, fill=(12, 16, 26, min(232, a)))
    d.rounded_rectangle(
        [x, y + dy, x + bw, y + dy + bh], radius=10, outline=accent + (a,), width=1
    )
    d.ellipse([x + 16, y + dy + 15, x + 28, y + dy + 27], fill=accent + (a,))
    d.text((x + 40, y + dy + 9), text, font=f, fill=SNOW + (a,))
    frame.alpha_composite(layer)


def chip(frame, cx, cy, icon, title, sub, t01):
    """玻璃质感能力卡片"""
    if t01 <= 0:
        return
    e = ease_out_cubic(t01)
    a = int(255 * e)
    dy = int((1 - e) * 70)
    layer = new_layer()
    d = ImageDraw.Draw(layer)
    w_, h_ = 258, 170
    x0, y0 = int(cx - w_ / 2), int(cy - h_ / 2 + dy)
    x1, y1 = x0 + w_, y0 + h_
    d.rounded_rectangle([x0, y0, x1, y1], radius=18, fill=(23, 29, 45, min(235, a)), outline=SNOW25 + (a,), width=1)
    d.ellipse([x0 + 22, y0 + 22, x0 + 66, y0 + 66], fill=GRAPE + (a,))
    d.text((x0 + 44, y0 + 31), icon, font=zh_b(26), fill=SNOW + (a,), anchor="mm")
    d.text((x0 + 22, y0 + 84), title, font=zh_b(24), fill=SNOW + (a,))
    d.text((x0 + 22, y0 + 120), sub, font=zh(15), fill=SNOW50 + (a,))
    frame.alpha_composite(layer)


def fade_frame(frame, t):
    """首尾黑场过渡"""
    alpha = 0.0
    if t < 0.5:
        alpha = 1 - seg(t, 0.0, 0.5)
    if t > DUR - 0.7:
        alpha = max(alpha, seg(t, DUR - 0.7, DUR))
    if alpha > 0:
        frame.alpha_composite(Image.new("RGBA", (W, H), (5, 5, 10, int(255 * alpha))))


# ---------------------------------------------------------------- scenes
def scene_intro(frame, t):
    """0 - 3.5s 品牌入场"""
    if t >= 3.5:
        return
    e_word = ease_out_expo(seg(t, 0.15, 1.4))
    a_word = int(255 * seg(t, 0.15, 0.9))
    glow = new_layer()
    gd = ImageDraw.Draw(glow)
    g = int(90 * e_word)
    gd.ellipse([440, 200, 840, 470], fill=GRAPE + (g,))
    glow = glow.filter(ImageFilter.GaussianBlur(90))
    frame.alpha_composite(glow)

    layer = new_layer()
    d = ImageDraw.Draw(layer)
    tracked_text(d, W / 2, 262, "MIANXU", en_blk(104), SNOW + (a_word,), tracking=18)
    if t > 1.6:
        e_sub = ease_out_cubic(seg(t, 1.6, 2.4))
        dy = int((1 - e_sub) * 24)
        d.text((W / 2, 415 + dy), "AI 面试工作台 · 宣传片", font=zh(30), fill=SNOW50 + (int(255 * e_sub),), anchor="mm")
    if t > 2.1:
        e_line = ease_in_out(seg(t, 2.1, 2.9))
        half = int(190 * e_line)
        d.line([(W / 2 - half, 470), (W / 2 + half, 470)], fill=VOLT + (int(230 * e_line),), width=3)
    frame.alpha_composite(layer)


def scene_props(frame, t):
    """3.5 - 8.5s 核心能力卡片"""
    if t < 3.3 or t >= 8.7:
        return
    lt = t - 3.5
    # 标题
    if t > 3.7:
        layer = new_layer()
        d = ImageDraw.Draw(layer)
        e = ease_out_cubic(seg(t, 3.7, 4.4))
        d.text((W / 2, 96 + int((1 - e) * -24)), "四个能力，覆盖面试全程", font=zh_b(34), fill=SNOW + (int(255 * e),), anchor="mm")
        frame.alpha_composite(layer)
    items = [
        ("译", "实时听译", "系统声音逐句转写", 640),
        ("答", "AI 流式作答", "贴合简历岗位作答", 900),
        ("练", "模拟面试", "AI 面试官动态追问", 380),
        ("析", "复盘报告", "每场练习有沉淀", 640),
    ]
    cys = {640: 340, 380: 560, 900: 560}
    delays = {640: 4.2, 380: 6.6, 900: 5.4}
    # 第一行两张（译/答），第二行两张（练/析）重排位置
    positions = [
        (370, 320, 4.2, items[0]),
        (640, 320, 4.7, items[1]),
        (910, 320, 5.2, items[2]),
        (640, 540, 5.9, items[3]),
    ]
    for cx, cy, delay, (icon, title, sub, _) in positions:
        chip(frame, cx, cy, icon, title, sub, seg(t, delay, delay + 0.75))


def scene_workbench(frame, t):
    """8.5 - 15.5s 真实截图：面试工作台"""
    if t < 8.3 or t >= 15.7:
        return
    img = SHOTS_IMGS.get("app-workbench.jpg")
    entry = seg(t, 8.5, 9.3)
    # Ken Burns 传给 draw_shot_window 前先做裁切运镜
    if img is not None and entry > 0:
        kb = ken_burns(img, seg(t, 9.3, 15.3), 1.0, 1.10, pan=(0.06, -0.04))
        draw_shot_window(frame, kb, (150, 92, 1130, 628), entry)
    caption(frame, 190, 560, "实时听译 · 逐句上屏", seg(t, 10.2, 10.9))
    caption(frame, 700, 560, "AI 流式作答 · 贴合上下文", seg(t, 11.6, 12.3), accent=GRAPE_L)
    if t > 13.4:
        layer = new_layer()
        d = ImageDraw.Draw(layer)
        e = ease_out_cubic(seg(t, 13.4, 14.1))
        d.text((W / 2, 668), "面试工作台 · Interview Workbench", font=zh(20), fill=SNOW50 + (int(220 * e),), anchor="mm")
        frame.alpha_composite(layer)


def scene_mock(frame, t):
    """15.5 - 21.5s 真实截图：模拟面试 + 复盘报告"""
    if t < 15.3 or t >= 21.7:
        return
    mock = SHOTS_IMGS.get("app-mock.jpg")
    report = SHOTS_IMGS.get("app-mock-report.jpg")
    e1 = seg(t, 15.5, 16.3)
    if mock is not None and e1 > 0:
        kb = ken_burns(mock, seg(t, 16.3, 21.3), 1.0, 1.09, pan=(-0.05, 0.05))
        draw_shot_window(frame, kb, (110, 102, 780, 620), e1)
    e2 = seg(t, 16.9, 17.7)
    if report is not None and e2 > 0:
        kb2 = ken_burns(report, seg(t, 17.7, 21.3), 1.06, 1.0)
        draw_shot_window(frame, kb2, (820, 152, 1190, 570), e2, shadow_off=(6, 10))
    caption(frame, 150, 556, "模拟面试 · 动态追问", seg(t, 17.6, 18.3))
    caption(frame, 860, 96, "复盘报告 · 量化成长", seg(t, 19.0, 19.7), accent=GRAPE_L)


def scene_privacy(frame, t):
    """21.5 - 26.5s 本地优先 / 多语言 / BYOK"""
    if t < 21.3 or t >= 26.7:
        return
    layer = new_layer()
    d = ImageDraw.Draw(layer)

    # 盾牌图标
    e_shield = ease_out_expo(seg(t, 21.7, 22.6))
    if e_shield > 0:
        a = int(255 * e_shield)
        cx, cy = W / 2, 240
        sc = 0.7 + 0.3 * e_shield
        r_out = int(56 * sc)
        d.polygon([(cx, cy - r_out), (cx + r_out * 0.82, cy - r_out * 0.5), (cx + r_out * 0.82, cy + r_out * 0.28),
                   (cx, cy + r_out), (cx - r_out * 0.82, cy + r_out * 0.28), (cx - r_out * 0.82, cy - r_out * 0.5)],
                  fill=GRAPE + (a,))
        d.line([(cx - 14 * sc, cy), (cx - 3 * sc, cy + 12 * sc), (cx + 15 * sc, cy - 11 * sc)],
               fill=VOLT + (a,), width=int(6 * sc) + 1)
        if t > 22.4:
            ea = ease_out_cubic(seg(t, 22.4, 23.1))
            d.text((W / 2, 344 + int((1 - ea) * 18)), "本地优先 · 数据保存在你的电脑", font=zh_b(38),
                   fill=SNOW + (int(255 * ea),), anchor="mm")

    # 语言胶囊
    langs = ["中文", "English", "日本語", "多语言面试"]
    colors = [SNOW50, SNOW50, SNOW50, VOLT]
    for i, (s, c) in enumerate(zip(langs, colors)):
        e = ease_out_cubic(seg(t, 23.5 + i * 0.22, 24.15 + i * 0.22))
        if e <= 0:
            continue
        f = zh_b(22) if i < 3 else zh_b(22)
        tw = d.textbbox((0, 0), s, font=f)[2]
        bw = tw + 52
        gap = 18
        total = sum(d.textbbox((0, 0), s2, font=f)[2] + 52 + gap for s2 in langs) - gap
        x = W / 2 - total / 2 + sum(d.textbbox((0, 0), s2, font=f)[2] + 52 + gap for s2 in langs[:i])
        x0, y0 = x, 420
        dy = int((1 - e) * 26)
        d.rounded_rectangle([x0, y0 + dy, x0 + bw, y0 + dy + 50], radius=25,
                            fill=(23, 29, 45, int(235 * e)), outline=c + (int(200 * e),), width=1)
        d.text((x0 + bw / 2, y0 + dy + 24), s, font=f, fill=c + (int(255 * e),), anchor="mm")

    if t > 24.9:
        e = ease_out_cubic(seg(t, 24.9, 25.6))
        d.text((W / 2, 540 + int((1 - e) * 14)), "AI 能力对接你自己的 OpenAI 兼容接口 · 多供应商按用途分配",
               font=zh(21), fill=SNOW50 + (int(230 * e),), anchor="mm")
    frame.alpha_composite(layer)


def scene_outro(frame, t):
    """26.5 - 31s 结尾品牌卡"""
    if t < 26.3:
        return
    glow = new_layer()
    gd = ImageDraw.Draw(glow)
    gd.ellipse([420, 180, 860, 470], fill=GRAPE + (int(80 * seg(t, 26.5, 27.6)),))
    glow = glow.filter(ImageFilter.GaussianBlur(95))
    frame.alpha_composite(glow)

    layer = new_layer()
    d = ImageDraw.Draw(layer)
    e_w = ease_out_expo(seg(t, 26.5, 27.7))
    sc = 1.18 - 0.18 * e_w
    if sc < 0.999:
        tmp = new_layer()
        tracked_text(ImageDraw.Draw(tmp), W / 2, 236, "MIANXU", en_blk(96),
                     SNOW + (int(255 * seg(t, 26.5, 27.3)),), tracking=16)
        tmp = tmp.resize((int(W * sc), int(H * sc)), Image.Resampling.BILINEAR)
        frame.alpha_composite(tmp, ((W - tmp.width) // 2, (H - tmp.height) // 2))
    else:
        tracked_text(d, W / 2, 236, "MIANXU", en_blk(96), SNOW + (255,), tracking=16)
    frame.alpha_composite(layer)

    if t > 27.8:
        layer2 = new_layer()
        d2 = ImageDraw.Draw(layer2)
        e_t = ease_out_cubic(seg(t, 27.8, 28.7))
        d2.text((W / 2, 400 + int((1 - e_t) * 22)), "让每一场面试，都有备而来",
                font=zh_b(40), fill=SNOW + (int(255 * e_t),), anchor="mm")
        e_s = ease_out_cubic(seg(t, 28.6, 29.4))
        d2.text((W / 2, 468), "MianXu · AI 面试工作台", font=zh(22), fill=SNOW50 + (int(220 * e_s),), anchor="mm")
        half = int(170 * ease_in_out(seg(t, 28.9, 29.8)))
        d2.line([(W / 2 - half, 508), (W / 2 + half, 508)], fill=VOLT + (int(230 * ease_in_out(seg(t, 28.9, 29.8))),), width=3)
        frame.alpha_composite(layer2)


SCENES = [scene_intro, scene_props, scene_workbench, scene_mock, scene_privacy, scene_outro]


# ---------------------------------------------------------------- render
def render_frames():
    if os.path.exists(FRAMES):
        shutil.rmtree(FRAMES)
    os.makedirs(FRAMES)
    bg_rgba = BG.convert("RGBA")
    for i in range(TOTAL):
        t = i / FPS
        frame = bg_rgba.copy()
        for fn in SCENES:
            fn(frame, t)
        fade_frame(frame, t)
        frame.convert("RGB").save(os.path.join(FRAMES, f"{i:04d}.png"))
        if i % 120 == 0:
            print(f"[render] frame {i}/{TOTAL} ({t:.1f}s)", flush=True)


def ffmpeg():
    exe = shutil.which("ffmpeg")
    if not exe:
        raise SystemExit("ffmpeg not found in PATH")
    # 注意：官网正式宣传片由 _film/mianxu-promo（huashu-motion 流水线）产出，
    # 本脚本仅作备用样片，输出到 fallback/，不覆盖正式成片。
    outdir = os.path.join(VIDDIR, "fallback")
    os.makedirs(outdir, exist_ok=True)
    promo = os.path.join(outdir, "mianxu-promo-pillow.mp4")
    subprocess.run(
        [exe, "-y", "-framerate", str(FPS), "-i", os.path.join(FRAMES, "%04d.png"),
         "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "19", "-preset", "medium",
         "-movflags", "+faststart", promo],
        check=True,
    )
    subprocess.run(
        [exe, "-y", "-ss", "0", "-t", "7.5", "-i", promo, "-an",
         "-vf", "scale=960:-2", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "21",
         "-preset", "medium", "-movflags", "+faststart", os.path.join(outdir, "hero-loop.mp4")],
        check=True,
    )
    subprocess.run(
        [exe, "-y", "-ss", "3.2", "-i", promo, "-frames:v", "1", "-q:v", "3",
         os.path.join(outdir, "poster.jpg")],
        check=True,
    )
    print("[ffmpeg] done:", promo)


if __name__ == "__main__":
    render_frames()
    ffmpeg()
    shutil.rmtree(FRAMES, ignore_errors=True)
    print("All done.")
