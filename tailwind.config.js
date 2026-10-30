/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: v("paper"),
        sheet: v("sheet"),
        ink: v("ink"),
        ink2: v("ink-2"),
        muted: v("muted"),
        rule: v("rule"),
        ruleStrong: v("rule-strong"),
        royal: v("royal"),
        emerald: v("emerald"),
        bad: v("bad"),
        warn: v("warn"),
        // The ERP application window is always dark — values from the ERP's tokens.css.
        erp: {
          side: "#070D1C",
          bg: "#05070F",
          surface: "#0B1830",
          surface2: "#10213F",
          line: "#1C2C4A",
          lineStrong: "#2A3D61",
          ink: "#E9EEF7",
          ink2: "#C5CFE0",
          muted: "#8D9AB3",
          blue: "#3E7BFA",
          btn: "#2F6BEF",
          ok: "#34D399",
          warn: "#FBBF24",
          bad: "#F87171",
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', "Arial", "Tahoma", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      borderRadius: { DEFAULT: "4px", sm: "4px", md: "6px" },
      maxWidth: { frame: "1320px" },
    },
  },
  plugins: [],
};
