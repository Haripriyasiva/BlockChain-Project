/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10b981', // emerald-500
          light: '#34d399', // emerald-400
          dark: '#059669', // emerald-600
        },
        secondary: {
          DEFAULT: '#14b8a6', // teal-500
          light: '#2dd4bf', // teal-400
          dark: '#0d9488', // teal-600
        },
        background: {
          // Dark theme backgrounds
          dark: {
            DEFAULT: '#312e81', // indigo-900
            darker: '#1e1b4b', // indigo-950
            lighter: '#4338ca', // indigo-700
          },
          // Light theme backgrounds
          light: {
            DEFAULT: '#f8fafc', // slate-50
            darker: '#f1f5f9', // slate-100
            lighter: '#ffffff', // white
          }
        },
        card: {
          // Dark theme card backgrounds
          dark: {
            DEFAULT: '#1e1b4b', // indigo-950
            hover: '#312e81', // indigo-900
            border: '#4338ca', // indigo-700
          },
          // Light theme card backgrounds
          light: {
            DEFAULT: '#ffffff', // white
            hover: '#f8fafc', // slate-50
            border: '#e2e8f0', // slate-200
          }
        },
        text: {
          // Dark theme text colors
          dark: {
            primary: '#f8fafc', // slate-50
            secondary: '#cbd5e1', // slate-300
            muted: '#64748b', // slate-500
          },
          // Light theme text colors
          light: {
            primary: '#0f172a', // slate-900
            secondary: '#334155', // slate-700
            muted: '#64748b', // slate-500
          }
        }
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'fadeIn': 'fadeIn 0.4s ease-out forwards',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
        'slideIn': 'slideIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(16, 185, 129, 0.5)',
        'card-light': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
  darkMode: 'class',
}
