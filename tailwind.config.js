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
      },
    },
  },
  plugins: [],
};
