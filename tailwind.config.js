/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // 语义色全部绑定 CSS 变量，浅色/深色由 [data-theme] 切换
        ink: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          900: "rgb(var(--surface) / <alpha-value>)",
          800: "rgb(var(--surface-2) / <alpha-value>)",
          700: "rgb(var(--surface-3) / <alpha-value>)",
          600: "rgb(var(--surface-4) / <alpha-value>)",
        },
        paper: {
          DEFAULT: "rgb(var(--text) / <alpha-value>)",
          dim: "rgb(var(--text-2) / <alpha-value>)",
          ash: "rgb(var(--text-3) / <alpha-value>)",
          mute: "rgb(var(--text-4) / <alpha-value>)",
        },
        brand: {
          DEFAULT: "rgb(var(--brand) / <alpha-value>)",
          light: "rgb(var(--brand-light) / <alpha-value>)",
          deep: "rgb(var(--brand-deep) / <alpha-value>)",
          contrast: "rgb(var(--brand-contrast) / <alpha-value>)",
        },
        line: "rgb(var(--line) / 0.14)",
        "line-soft": "rgb(var(--line) / 0.07)",
      },
      fontFamily: {
        display: [
          '"PingFang SC"',
          '"Microsoft YaHei"',
          '"Segoe UI"',
          "system-ui",
          "sans-serif",
        ],
        serif: ['Georgia', '"Times New Roman"', '"Songti SC"', "serif"],
        mono: ['"Cascadia Code"', '"JetBrains Mono"', "Consolas", "monospace"],
      },
      maxWidth: {
        wrap: "1440px",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
