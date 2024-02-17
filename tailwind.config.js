/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "charcoal-primary": "#454545",
        "orange-primary": "#FF6000",
        "lightOrange-primary": "#FFA559",
        "paleOrange-primary": "#FFE6C7",
      },
      fontFamily: {
        "noto-sans-jp": ["Noto Sans JP", "Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
