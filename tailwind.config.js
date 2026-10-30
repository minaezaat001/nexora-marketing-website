/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        canvas: v("canvas"),
        surface: v("surface"),
        surface2: v("surface-2"),
        side: v("side"),
        line: v("line"),
        lineStrong: v("line-strong"),
        ink: v("ink"),
        ink2: v("ink-2"),
        muted: v("muted"),
        accent: v("accent"),
        brand: v("brand"),
        cyan: "#29B6FF",
        purple: "#8B3FE8",
        blue: "#3E7BFA",
        ok: v("ok"),
        warn: v("warn"),
        bad: v("bad"),
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', "Arial", "Segoe UI", "Tahoma", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      borderRadius: { sm: "8px", md: "12px", lg: "16px" },
    },
  },
  plugins: [],
};
