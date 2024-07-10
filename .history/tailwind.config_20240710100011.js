/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ["var(--font-geist-mono)"],
        template: ['Verdana', 'sans-serif']
      },
      colors: {
        templateBlue: '#095196',
        templateGray: '#454242'
      }
    },
  },
  plugins: [],
}