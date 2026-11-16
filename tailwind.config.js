/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        realm: {
          bg: '#08090C',
          secondary: '#111318',
          tertiary: '#171A21',
          gold: '#C5A15B',
          goldLight: '#FFE28A',
          goldDark: '#8F7238',
          blood: '#8B1E24',
          dragon: '#E63946',
          ice: '#9BC7DF',
          text: '#E7E1D5',
          muted: '#A3A096'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Trajan Pro', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace']
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(197, 161, 91, 0.35)',
        'medieval': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(197, 161, 91, 0.35)'
      }
    },
  },
  plugins: [],
}
