/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      colors: {
        app: 'rgb(var(--color-app) / <alpha-value>)',
        section: 'rgb(var(--color-section) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        elevated: 'rgb(var(--color-elevated) / <alpha-value>)',
        theme: 'rgb(var(--color-border) / <alpha-value>)',
        primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
        muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
        subtle: 'rgb(var(--color-text-subtle) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-hover': 'rgb(var(--color-accent-hover) / <alpha-value>)',
        'accent-contrast': 'rgb(var(--color-accent-contrast) / <alpha-value>)',
        'shadow-glow': 'rgb(var(--color-shadow-glow) / <alpha-value>)',
        'hero-nebula': 'rgb(var(--color-hero-nebula) / <alpha-value>)',
        'project-deep': 'rgb(var(--color-project-deep) / <alpha-value>)',

        // Backward-compatible aliases while components migrate to semantic tokens.
        'amber-glow': 'rgb(var(--color-accent) / <alpha-value>)',
        'amber-light': 'rgb(var(--color-accent-hover) / <alpha-value>)',
        'amber-dark': '#C9980A',
        'near-black': 'rgb(var(--color-app) / <alpha-value>)',
        'dark-1': 'rgb(var(--color-section) / <alpha-value>)',
        'dark-2': 'rgb(var(--color-surface) / <alpha-value>)',
        'dark-3': 'rgb(var(--color-elevated) / <alpha-value>)',
        'dark-4': 'rgb(var(--color-border) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-subtle) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-muted) / <alpha-value>)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-right': 'slideRight 0.8s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'spin-slow': 'spin 8s linear infinite',
        'marquee': 'marquee 40s linear infinite',
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
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};
