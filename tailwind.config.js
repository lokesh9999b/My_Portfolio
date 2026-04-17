/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      colors: {
        'amber-glow': '#F5C518',
        'amber-light': '#FFD84D',
        'amber-dark': '#C9980A',
        'near-black': '#0A0A0A',
        'dark-1': '#111111',
        'dark-2': '#1A1A1A',
        'dark-3': '#252525',
        'dark-4': '#333333',
        'text-muted': '#888888',
        'text-secondary': '#BBBBBB',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-right': 'slideRight 0.8s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
