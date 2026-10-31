/**
 * Vercel Serverless Function: /api/download/[platform]
 * 服务端读取 GitHub Releases 的 Tauri 更新清单（latest.json，CDN 静态文件、无限流），
 * 按最新版本号 302 到对应的官方资产直链。清单读取失败时兜底跳 Releases 页。
 *
 * platform: win | win-portable | mac-arm | mac-intel
 */
const REPO = "alvinluo-tech/interview-assistant";
const RELEASES_PAGE = `https://github.com/${REPO}/releases/latest`;
const LATEST_MANIFEST = `https://github.com/${REPO}/releases/latest/download/latest.json`;

const ASSET_BY_PLATFORM = {
  win: (v) => `Mianxu_${v}_x64-setup.exe`,
  "win-portable": (v) => `Mianxu_${v}_x64-portable.exe`,
  "mac-arm": (v) => `Mianxu_${v}_arm64.dmg`,
  "mac-intel": (v) => `Mianxu_${v}_x64.dmg`,
};

export default async function handler(req, res) {
  const platform = req.query.platform;
  const toFile = ASSET_BY_PLATFORM[platform];
  try {
    if (!toFile) throw new Error("unknown platform");
    const r = await fetch(LATEST_MANIFEST, { redirect: "follow" });
    if (!r.ok) throw new Error(String(r.status));
    const manifest = await r.json();
    const version = String(manifest.version || "").replace(/^v/, "");
    if (!version) throw new Error("no version in manifest");
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
    return res.redirect(302, `https://github.com/${REPO}/releases/download/v${version}/${toFile(version)}`);
  } catch {
    return res.redirect(302, RELEASES_PAGE);
  }
}
