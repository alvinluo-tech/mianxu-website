/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // 取自产品真实界面：冷调藏青
        ink: {
          DEFAULT: "#0A0F19",
          900: "#0A0F19",
          800: "#0B111F",
          700: "#131929",
          600: "#1B2233",
        },
        // 冷白纸感
        paper: {
          DEFAULT: "#E8ECF4",
          dim: "#C3CAD8",
          ash: "#8A93A6",
          mute: "#5B6478",
        },
        // 唯一点缀色：产品青蓝（采样自界面主按钮 #15AEF2）
        brand: {
          DEFAULT: "#15AEF2",
          light: "#4FC3F7",
          deep: "#0A6E9E",
        },
        line: "rgba(232, 236, 244, 0.14)",
        "line-soft": "rgba(232, 236, 244, 0.07)",
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
