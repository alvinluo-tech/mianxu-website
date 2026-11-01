/**
 * 判定访客应下载哪个包。纯函数，便于测试。
 * - iOS / iPadOS（含 iPadOS 13+ 伪装成 Mac）没有桌面版 → other
 * - UA 无法区分 Apple Silicon 与 Intel → Mac 默认 mac-arm
 */
export function detectTarget({
  userAgent = "",
  platform = "",
  maxTouchPoints = 0,
} = {}) {
  const touchMac = platform === "MacIntel" && maxTouchPoints > 1;
  if (/iPhone|iPad|iPod/i.test(userAgent) || touchMac) return "other";
  if (/Mac/i.test(userAgent)) return "mac-arm";
  if (/Win/i.test(userAgent)) return "win";
  return "other";
}
