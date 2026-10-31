/**
 * Vercel Serverless Function: /api/latest
 * 返回最新版本信息（服务端读 Tauri 清单，边缘缓存 10 分钟），供官网展示版本号。
 * 失败时返回 { tag: null }，前端隐藏版本号即可。
 */
const LATEST_MANIFEST =
  "https://github.com/alvinluo-tech/interview-assistant/releases/latest/download/latest.json";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=3600");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  try {
    const r = await fetch(LATEST_MANIFEST, { redirect: "follow" });
    if (!r.ok) throw new Error(String(r.status));
    const manifest = await r.json();
    return res.status(200).end(
      JSON.stringify({
        tag: `v${String(manifest.version || "").replace(/^v/, "")}`,
        date: (manifest.pub_date || "").slice(0, 10) || null,
      })
    );
  } catch {
    return res.status(200).end(JSON.stringify({ tag: null, date: null }));
  }
}
