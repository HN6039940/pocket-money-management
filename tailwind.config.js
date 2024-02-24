/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#40A2E3",
        "secondary-color": "#FFF6E9",
        "tertiary-color": "#BBE2EC",
        "quaternary-color": "#0D9276",
      },
      fontFamily: {
        "noto-sans-jp": ["Noto Sans JP", "Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
