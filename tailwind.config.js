/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './context/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        teal:   '#0E7B8C',
        yellow: '#F5C518',
        cream:  '#F6F1E4',
        ink:    '#111111',
        orange: '#E8593C',
      },
      fontFamily: {
        sans:    ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['"Paytone One"', 'sans-serif'],
        bebas:   ['"Bebas Neue"', 'cursive'],
      },
    },
  },
  plugins: [],
};
