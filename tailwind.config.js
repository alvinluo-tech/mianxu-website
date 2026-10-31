/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A12",
          800: "#10101B",
          700: "#16162A",
          600: "#1E1E36",
        },
        snow: {
          DEFAULT: "#DFDFF0",
          75: "#C6C8DE",
          50: "#9A9DB9",
          25: "#5E6180",
        },
        grape: {
          200: "#B7A6F5",
          300: "#8B72E8",
          400: "#6D4AFF",
          500: "#4B2FD6",
          deep: "#241655",
        },
        volt: "#D8FF3E",
      },
      fontFamily: {
        display: [
          '"Segoe UI Black"',
          '"Segoe UI"',
          '"Microsoft YaHei"',
          "system-ui",
          "sans-serif",
        ],
        sans: ['"Segoe UI"', '"Microsoft YaHei"', "system-ui", "sans-serif"],
        mono: ['"Cascadia Code"', '"JetBrains Mono"', "Consolas", "monospace"],
      },
      boxShadow: {
        panel: "0 30px 80px -20px rgba(10, 10, 25, 0.8)",
        glow: "0 0 90px -18px rgba(109, 74, 255, 0.55)",
      },
      keyframes: {
        "spin-slow": { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
        float: {
          "0%, 100%": { transform: "translateY(-6px)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 18s linear infinite",
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
