/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  preflight: false,
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: '#7749a3',
        fontPrimary: '#6a6d82'
      }
    }
  },
  plugins: []
}
