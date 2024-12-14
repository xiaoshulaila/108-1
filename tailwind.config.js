/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        binance: {
          yellow: '#F0B90B',
          black: '#0C0E12',
          gray: '#1E2329',
          border: '#2B3139',
          text: '#848E9C',
        },
      },
    },
  },
  plugins: [],
};