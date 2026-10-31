export const GITHUB_REPO = "https://github.com/alvinluo-tech/interview-assistant";
export const GITHUB_RELEASES = `${GITHUB_REPO}/releases`;
export const RELEASE_TAG = "v0.1.5";
export const RELEASE_DATE = "2026-10-31";

/**
 * 官方下载入口：生产环境走 Vercel 函数 /api/download/[platform]
 * （服务端读 latest.json 后 302 到最新版资产，无限流、自动最新版、直下不跳页）；
 * 本地 dev 没有 /api，回退到 GitHub Releases 页。
 */
export function downloadUrl(platform) {
  if (import.meta.env.DEV) return `${GITHUB_RELEASES}/latest`;
  return `/api/download/${platform}`;
}

/** 最新版本信息端点（同源、边缘缓存）；dev 下返回 null 表示不展示 */
export function latestInfoUrl() {
  return import.meta.env.DEV ? null : "/api/latest";
}
