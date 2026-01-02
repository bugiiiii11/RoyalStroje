/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange-primary': '#FF6600',
        'orange-hover': '#ff8533',
      },
      animation: {
        'float-slow': 'float 20s ease-in-out infinite',
        'float-slower': 'float 25s ease-in-out infinite reverse',
        'float-reverse': 'floatReverse 18s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 10s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(30px, -30px)' },
          '50%': { transform: 'translate(-20px, 20px)' },
          '75%': { transform: 'translate(20px, 10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-25px, 20px)' },
          '50%': { transform: 'translate(30px, -15px)' },
          '75%': { transform: 'translate(-15px, -25px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4', transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { opacity: '0.6', transform: 'translate(-50%, -50%) scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
}