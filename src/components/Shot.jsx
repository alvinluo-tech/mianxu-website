import { useTheme } from "../lib/theme";

/**
 * 随主题切换的产品截图。
 * 约定：深色 = /img/app/<name>.jpg，浅色 = /img/app/<name>-light.jpg
 * darkOnly：产品该界面只有深色（如模拟面试间、复盘弹窗），两种主题都用深色图。
 */
export default function Shot({ name, alt, className = "", darkOnly = false, eager = false }) {
  const { theme } = useTheme();
  const base = `/img/app/${name}`;
  const src = theme === "light" && !darkOnly ? `${base}-light.jpg` : `${base}.jpg`;

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      className={className}
    />
  );
}
