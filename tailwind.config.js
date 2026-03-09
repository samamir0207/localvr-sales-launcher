/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#d4bda2',
          hover: '#c4ad92',
          dark: '#B8A08A',
          foreground: '#1f2937',
        },
        background: '#faf9f7',
        card: '#ffffff',
        foreground: '#2D2D2D',
        'muted-foreground': '#6B6B6B',
        border: '#E5E0DA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Libre Baskerville', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
