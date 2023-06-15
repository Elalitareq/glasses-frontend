/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
       "primary-gradient": "linear-gradient(90deg, rgb(111, 172, 194) 0%,rgb(70, 146, 156)  50%)"
      }
    },
  },
  plugins: [],
}