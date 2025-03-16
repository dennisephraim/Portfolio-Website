import type { Config } from "tailwindcss";

import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        custom_slate: "rgb(2 6 23)",
        custom_blue_shade: "rgb(10 30 50)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config);
