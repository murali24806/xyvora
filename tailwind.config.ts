import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#6366f1",
          hover: "#4f46e5",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#06b6d4",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#8b5cf6",
        },
        muted: {
          DEFAULT: "#18181b",
          foreground: "#a1a1aa",
        },
        charcoal: {
          950: "#07070a",
          900: "#0d0e14",
          800: "#13141f",
          700: "#1d1e2e",
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glow-mesh': 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%), radial-gradient(circle at 0% 50%, rgba(6, 182, 212, 0.12), transparent 50%)',
      }
    },
  },
  plugins: [],
};
export default config;

