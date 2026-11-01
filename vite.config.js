import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { RELEASE_TAG } from "./src/lib/constants.js";

const REPO = "alvinluo-tech/interview-assistant";
const MANIFEST = `https://github.com/${REPO}/releases/latest/download/latest.json`;

const ASSET_BY_PLATFORM = {
  win: (v) => `Mianxu_${v}_x64-setup.exe`,
  "win-portable": (v) => `Mianxu_${v}_x64-portable.exe`,
  "mac-arm": (v) => `Mianxu_${v}_arm64.dmg`,
  "mac-intel": (v) => `Mianxu_${v}_x64.dmg`,
};

async function latestVersion() {
  try {
    const res = await fetch(MANIFEST, { redirect: "follow" });
    if (!res.ok) throw new Error(String(res.status));
    const manifest = await res.json();
    const v = String(manifest.version || "").replace(/^v/, "");
    return v || String(RELEASE_TAG).replace(/^v/, "");
  } catch {
    // 本机连不上 GitHub 时用构建期版本，仍然直下而不是跳 Releases 页
    return String(RELEASE_TAG).replace(/^v/, "");
  }
}

/**
 * 开发环境复刻 api/ 下的 Vercel 函数，保证本地点击下载与线上一致（302 直链）。
 */
function downloadApiDev() {
  return {
    name: "mianxu-download-api-dev",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, "http://localhost");
        if (!url.pathname.startsWith("/api/")) return next();

        if (url.pathname === "/api/latest") {
          const v = await latestVersion();
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(JSON.stringify({ tag: `v${v}`, date: null }));
          return;
        }

        const m = url.pathname.match(/^\/api\/download\/([\w-]+)$/);
        if (m) {
          const toFile = ASSET_BY_PLATFORM[m[1]];
          const v = await latestVersion();
          if (!toFile) {
            res.writeHead(302, { Location: `https://github.com/${REPO}/releases/latest` });
            res.end();
            return;
          }
          res.writeHead(302, {
            Location: `https://github.com/${REPO}/releases/download/v${v}/${toFile(v)}`,
          });
          res.end();
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), downloadApiDev()],
  server: {
    port: 5180,
    open: false,
  },
});
