/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0f0f12',
          light: '#16161c',
          lighter: '#1e1e26'
        },
        foreground: {
          DEFAULT: '#f8f8f8',
          muted: '#a0a0a8'
        },
        primary: {
          DEFAULT: '#7e6bff',
          hover: '#9484ff',
          muted: '#5a4dcc'
        },
        secondary: {
          DEFAULT: '#16b1ff',
          hover: '#4cc2ff',
          muted: '#0d8ecc'
        },
        accent: {
          DEFAULT: '#ff5e6b',
          hover: '#ff7a85',
          muted: '#cc4a54'
        },
        success: {
          DEFAULT: '#34d399',
          muted: '#10b981'
        },
        warning: {
          DEFAULT: '#fbbf24',
          muted: '#f59e0b'
        },
        error: {
          DEFAULT: '#f43f5e',
          muted: '#e11d48'
        }
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typewriter': 'typewriter 4s steps(40) 1s both',
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.5' y='0.5' width='19' height='19' stroke='%23ffffff10'/%3E%3C/svg%3E\")",
      },
      cursor: {
        'none': 'none',
      },
      boxShadow: {
        'highlight': '0 0 15px 1px rgba(126, 107, 255, 0.4)',
      },
      spacing: {
        '100': '25rem',
        '120': '30rem',
      },
    },
  },
  plugins: [],
};