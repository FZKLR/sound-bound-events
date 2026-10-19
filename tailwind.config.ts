import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          neon: "#00FF66",
          dark: "#050505",
          card: "#0D0D0D",
          border: "#1A1A1A",
        },
      },
    },
  },
  plugins: [],
};
export default config;