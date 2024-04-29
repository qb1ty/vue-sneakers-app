const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'carousel-jpeg': "url('./public/carousel.jpeg')",
        'sneakers-background-png': "url('./public/sneakers-background.png')"
      }
    }
  },
  plugins: [],
}

