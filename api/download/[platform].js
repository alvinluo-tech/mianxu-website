/**
 * Vercel Serverless Function: /api/download/[platform]
 * 服务端读取 GitHub Releases 的 Tauri 更新清单（latest.json，CDN 静态文件、无限流），
 * 按最新版本号 302 到对应的官方资产直链；清单不可用时退回到构建期已知版本，仍为直链。
 *
 * platform: win | win-portable | mac-arm | mac-intel
 */
import { RELEASE_TAG } from "../../src/lib/constants.js";

const REPO = "alvinluo-tech/interview-assistant";
const LATEST_MANIFEST = `https://github.com/${REPO}/releases/latest/download/latest.json`;

const ASSET_BY_PLATFORM = {
  win: (v) => `Mianxu_${v}_x64-setup.exe`,
  "win-portable": (v) => `Mianxu_${v}_x64-portable.exe`,
  "mac-arm": (v) => `Mianxu_${v}_arm64.dmg`,
  "mac-intel": (v) => `Mianxu_${v}_x64.dmg`,
};

function assetUrl(platform, version) {
  const toFile = ASSET_BY_PLATFORM[platform];
  if (!toFile) return null;
  return `https://github.com/${REPO}/releases/download/v${version}/${toFile(version)}`;
}

export default async function handler(req, res) {
  const platform = req.query.platform;
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");

  let version = String(RELEASE_TAG).replace(/^v/, "");
  try {
    const r = await fetch(LATEST_MANIFEST, { redirect: "follow" });
    if (r.ok) {
      const manifest = await r.json();
      const latest = String(manifest.version || "").replace(/^v/, "");
      if (latest) version = latest;
    }
  } catch {
    /* 网络异常时沿用构建期版本 */
  }

  const url = assetUrl(platform, version);
  if (!url) {
    return res.redirect(302, `https://github.com/${REPO}/releases/latest`);
  }
  return res.redirect(302, url);
}
