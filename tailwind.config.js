/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css}'],
  theme: {
    extend: {
      colors: {
        primary: '#16213e',
        secondary: '#0f3460',
        accent: '#e94560',
        background: '#1a1a2e',
      },
    },
  },
  plugins: [],
}
