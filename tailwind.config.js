/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        moto: {
          bg: "#08070B",
          card: "#120F19",
          border: "#2A1E35",
          pink: {
            light: "#FFC2D4",
            DEFAULT: "#FF9EBB",
            hot: "#FF4D8D",
            deep: "#D81E5B",
            glow: "#FFA3C8"
          },
          dark: {
            900: "#08070B",
            800: "#0F0C16",
            700: "#1A1526",
            600: "#271E3A",
          }
        }
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        handwriting: ['"Dancing Script"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 9s ease-in-out infinite',
        'twinkle': 'twinkle 2.5s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 15px rgba(255, 158, 187, 0.35))' },
          '50%': { filter: 'drop-shadow(0 0 30px rgba(255, 77, 141, 0.7))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.03)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      }
    },
  },
  plugins: [],
}
