/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brown & White Cultural Palette 
        'coklat-utama': '#8B4513',
        'coklat-muda': '#D2B48C', 
        'coklat-tua': '#654321',
        'krem-hangat': '#F5F5DC',
        'putih-bersih': '#FFFFFF'
      },
      fontFamily: {
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'noto-serif': ['Noto Serif', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #8B4513, 0 0 10px #8B4513, 0 0 15px #8B4513' },
          '100%': { boxShadow: '0 0 10px #8B4513, 0 0 20px #8B4513, 0 0 30px #8B4513' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
