/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
      colors: {
        ae2: {
          50:  '#e6f9ff',
          100: '#b3efff',
          200: '#66dcff',
          300: '#1ac8ff',
          400: '#00b8f0',
          500: '#0099cc',
          600: '#0077a3',
          700: '#005577',
          800: '#00334a',
          900: '#001a26',
        },
      },
      boxShadow: {
        glow: '0 0 12px rgba(0, 212, 255, 0.3)',
        'glow-amber': '0 0 12px rgba(245, 158, 11, 0.3)',
        'glow-emerald': '0 0 12px rgba(16, 185, 129, 0.3)',
      },
    },
  },
  plugins: [],
}
