/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Tokens semánticos (definidos como variables CSS en index.css; cambian con el tema).
        app: v("--c-app"),
        surface: v("--c-surface"),
        elevated: v("--c-elevated"),
        hairline: v("--c-border"),
        tint: v("--c-tint"),
        primary: v("--c-text"),
        secondary: v("--c-text2"),
        muted: v("--c-text3"),
        accent: {
          DEFAULT: v("--c-accent"),
          hover: v("--c-accent2"),
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          '"Inter"',
          "system-ui",
          "sans-serif",
        ],
        display: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"Inter"',
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        apple: "18px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "fade-up": "fade-up 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fade-in 0.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};
