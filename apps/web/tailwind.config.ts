import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#0B1020",
          700: "#1E2A52"
        },
        accent: {
          500: "#8B5CF6"
        }
      }
    }
  },
  plugins: []
};

export default config;
