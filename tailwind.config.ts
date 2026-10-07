import type { Config } from "tailwindcss";

// 랜시티 로고 공식 색: navy #163259 / burgundy #88181C
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#163259", 900: "#0E2140", 700: "#24426B", 600: "#3B5679" },
        pearl: { DEFAULT: "#F4F2EE", 50: "#FAF9F7" },
        greige: { DEFAULT: "#7F7B76", 300: "#BDB8B1" },
        line: "#DCD8D1",
        burgundy: { DEFAULT: "#88181C", 300: "#D08A8C" },
      },
      fontFamily: {
        sans: ["Pretendard", "-apple-system", "BlinkMacSystemFont", "Apple SD Gothic Neo", "Malgun Gothic", "sans-serif"],
      },
      borderRadius: { DEFAULT: "2px", sm: "2px", md: "4px" },
      maxWidth: { site: "1280px" },
      letterSpacing: { over: "0.28em", tightest: "-0.035em" },
    },
  },
  plugins: [],
};
export default config;
