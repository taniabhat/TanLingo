import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        duo: {
          green: "#58cc02",
          "green-dark": "#46a302",
          "green-shadow": "#58a700",
          blue: "#1cb0f6",
          "blue-dark": "#1899d6",
          "blue-shadow": "#1899d6",
          red: "#ff4b4b",
          "red-dark": "#ea2b2b",
          "red-shadow": "#ea2b2b",
          yellow: "#ffc800",
          "yellow-dark": "#e5b400",
          orange: "#ff9600",
          purple: "#ce82ff",
          gray: "#afafaf",
          "gray-light": "#e5e5e5",
          "gray-bg": "#f7f7f7",
          "dark-bg": "#131f24",
          "dark-card": "#202f36",
          "dark-border": "#37464f",
        },
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "Nunito", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "duo-btn": "0 4px 0 0",
        "duo-card": "0 2px 8px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
