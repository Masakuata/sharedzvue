/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#1E8C93',
        secondaryLigthBlue: '#F1FBFF',
        redCancel: '#93481E',
        blueLetters: '#4771A3',
        prymaryDarkBlue: '#145f63',
        bgBlue: '#054F7E',
        textBlueDark: '#001D33',
        bgBlueLight: '#CFE5FF',
      }
    },
  },
  plugins: [],
}
