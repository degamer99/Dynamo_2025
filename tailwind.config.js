/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF9',
          100: '#FAF8F4',
          200: '#F4EFE6',
          300: '#E9E2D5',
          400: '#D8CEBC',
          500: '#B8AA94',
        },
        emerald: {
          850: '#033f30',
          900: '#022c22',
          950: '#011c15',
        },
        copper: {
          50: '#FDF8F5',
          100: '#FAECE4',
          200: '#F3D5C5',
          300: '#E7B59D',
          400: '#D8916E',
          500: '#C67145',
          600: '#B35830',
          700: '#944222',
          800: '#7A351E',
          900: '#642E1C',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'copper': '0 4px 20px -2px rgba(198, 113, 69, 0.25)',
        'copper-lg': '0 10px 30px -4px rgba(198, 113, 69, 0.35)',
        'emerald': '0 4px 20px -2px rgba(2, 44, 34, 0.25)',
        'book': '0 20px 40px -15px rgba(0, 0, 0, 0.3), 0 0 15px rgba(198, 113, 69, 0.15)',
      }
    },
  },
  plugins: [],
}
