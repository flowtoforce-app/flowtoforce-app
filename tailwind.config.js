/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000055',
        secondary: '#4169E1',
        accent: '#FFD700',
      },
      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif'],
        space: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
