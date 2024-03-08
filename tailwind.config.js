/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",

    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "queen-blue": "#3667ED",
        "queen-yellow": "#E5FC52",
        "queen-black": "#362921",
        "queen-gray": "#D7CDFB",
        "queen-white": "#F7F7F7",
        "queen-orange": "#FF7300",
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"],
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("flowbite/plugin")],
};