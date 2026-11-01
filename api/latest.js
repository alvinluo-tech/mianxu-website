/**
 * Vercel Serverless Function: /api/latest
 * 返回最新版本信息（服务端读 Tauri 清单，边缘缓存 10 分钟）；读取失败时退回构建期版本。
 */
import { RELEASE_TAG, RELEASE_DATE } from "../../src/lib/constants.js";

const LATEST_MANIFEST =
  "https://github.com/alvinluo-tech/interview-assistant/releases/latest/download/latest.json";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=3600");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  let tag = RELEASE_TAG;
  let date = RELEASE_DATE;
  try {
    const r = await fetch(LATEST_MANIFEST, { redirect: "follow" });
    if (r.ok) {
      const manifest = await r.json();
      const v = String(manifest.version || "").replace(/^v/, "");
      if (v) tag = `v${v}`;
      const d = String(manifest.pub_date || "").slice(0, 10);
      if (d) date = d;
    }
  } catch {
    /* 网络异常时沿用构建期版本 */
  }

  return res.status(200).end(JSON.stringify({ tag, date }));
}
