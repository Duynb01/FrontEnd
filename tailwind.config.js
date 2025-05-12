/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        main: "var(--main-color)",
        label: "var(--label-color)",
        discount: "var(--price-discount)",
        old: "var(--price-old)",
        price: "var(--price-color)",
      },
      screens: {
        mdc: "991px",
        smc: "576px",
      },
      keyframes: {
        pulseSmall: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "50%": { opacity: "0.6" },
          "100%": { transform: "scale(3.4)", opacity: "0" },
        },
      },
      animation: {
        pulseSmall: "pulseSmall 1.2s ease-out forwards infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
