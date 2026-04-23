/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      fontFamily: {
        sans: ['"League Spartan"', 'sans-serif'], // Sets League Spartan as the default app font
      },
      fontSize: {
        'heading-l': ['36px', { lineHeight: '33px', letterSpacing: '-1px', fontWeight: '700' }],
        'heading-m': ['24px', { lineHeight: '22px', letterSpacing: '-0.75px', fontWeight: '700' }],
        'heading-s': ['15px', { lineHeight: '24px', letterSpacing: '-0.25px', fontWeight: '700' }],
        'heading-s-var': ['15px', { lineHeight: '15px', letterSpacing: '-0.25px', fontWeight: '700' }],
        'body': ['13px', { lineHeight: '18px', letterSpacing: '-0.1px', fontWeight: '500' }],
        'body-var': ['13px', { lineHeight: '15px', letterSpacing: '-0.25px', fontWeight: '500' }],
      },
      colors: {
        brand: {
          DEFAULT: '#7C5DFA',
          light: '#9277FF',
        },
        dark: {
          bg: '#141625',
          surface: '#1E2139',
          border: '#252945',
        },
        light: {
          bg: '#F8F8FB',
        },
        danger: '#EC5757',
        slate: {
          main: '#0C0E16', 
          muted: '#888EB0', 
          light: '#DFE3FA', 
        }
      }
    },
  },
  plugins: [],
}