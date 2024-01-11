/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/vue-tailwind-datepicker/**/*.js",
  ],
  theme: {
    extend: {
      colors: {  
        "vtd-primary": colors.sky, // Light mode Datepicker color
        "vtd-secondary": colors.gray, // Dark mode Datepicker color
        primaryBlue: '#1E8C93',
        secondaryLigthBlue: '#F1FBFF',
        redCancel: '#93481E',
        blueLetters: '#4771A3',
        prymaryDarkBlue: '#145f63',
        bgBlue: '#054F7E',
        textBlueDark: '#001D33',
        bgBlueLight: '#CFE5FF',
        bgPurple: '#695779',
        bgProduct: '#DEE3EB',
        colorTextGray: '#42474E' ,
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
