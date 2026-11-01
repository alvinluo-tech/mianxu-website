export const GITHUB_REPO = "https://github.com/alvinluo-tech/interview-assistant";
export const GITHUB_RELEASES = `${GITHUB_REPO}/releases`;
export const RELEASE_TAG = "v0.1.5";
export const RELEASE_DATE = "2026-10-31";

/**
 * 下载入口：同源 /api/download/[platform]
 * - 线上：Vercel 函数读 latest.json 后 302 到最新版资产（无限流、自动最新版、点击即下）
 * - 本地：vite.config.js 里的中间件复刻同一逻辑，行为与线上一致
 */
export function downloadUrl(platform) {
  return `/api/download/${platform}`;
}

/** 最新版本信息端点（同源）；本地由 dev 中间件提供 */
export function latestInfoUrl() {
  return "/api/latest";
}
