/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        gold: {
          50: '#fdfbf7',
          100: '#fbf7ed',
          200: '#f3e8cf',
          300: '#ebd1a0',
          400: '#e1b36d',
          500: '#d49442',
          600: '#c27d35',
          700: '#a1612a',
          800: '#814a24',
          900: '#64381e'
        },
        obsidian: '#0B0B0B',
        charcoal: '#1A1A1A'
      }
    }
  },
  plugins: []
};