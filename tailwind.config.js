/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff2e5',
          100: '#ffe0cc',
          200: '#ffc199',
          300: '#ffa366',
          400: '#ff8533',
          500: '#ff6600', // Primary orange
          600: '#cc5200',
          700: '#993d00',
          800: '#662900',
          900: '#331400',
        },
        secondary: {
          50: '#e9edf5',
          100: '#c8d1e6',
          200: '#a7b6d7',
          300: '#869ac7',
          400: '#657fb8',
          500: '#4464a9',
          600: '#2c5697', // Secondary blue
          700: '#214070',
          800: '#16294a',
          900: '#0b1525',
        },
        accent: {
          500: '#37b54a', // Accent green
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};