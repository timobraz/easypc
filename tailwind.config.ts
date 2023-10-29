import type { Config } from "tailwindcss";

const config: Config = {
  content: [".app/pages/**/*.{js,ts,jsx,tsx,mdx}", "./app/components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E5E4E2",
        secondary: "#1E1E1E",
        accent: "#808080",
        accent2: "#EAEAEA",
      },
    },
  },
  plugins: [],
};
export default config;
