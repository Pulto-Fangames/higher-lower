/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        isedol: "#e7416f",
        woowakgood: "#d6a968",
        waktaverse: "#6db69e",
        hwaktaverse: "#4e8170",
        bestscore: "#1dce91"
      },
      width: {
        "three": "150%"
      }
    },
  },
  plugins: [],
}