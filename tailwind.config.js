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
        void: '#09090F',
        surface: {
          DEFAULT: '#151520',
          elevated: '#1D1D2C',
          subtle: '#26263B',
          border: '#27273A',
        },
        primary: {
          DEFAULT: '#F8F7FF',
          muted: '#A4A3B5',
          faint: '#6E6D82',
        },
        accent: {
          purple: '#9B5CFF',
          pink: '#FF4FA3',
          lime: '#C7FF5E',
          blue: '#5B8CFF',
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'Syne', 'Inter', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
      },
      screens: {
        'xs': '360px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(155, 92, 255, 0.4)',
        'glow-pink': '0 0 25px -5px rgba(255, 79, 163, 0.4)',
        'glow-lime': '0 0 25px -5px rgba(199, 255, 94, 0.4)',
        'glow-blue': '0 0 25px -5px rgba(91, 140, 255, 0.4)',
        'card-elevated': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'float-fast': 'float 3.5s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { opacity: '0.6', filter: 'brightness(1)' },
          '100%': { opacity: '1', filter: 'brightness(1.25)' },
        }
      }
    },
  },
  plugins: [],
}
