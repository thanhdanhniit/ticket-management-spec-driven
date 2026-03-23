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
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          dark: '#1D4ED8',
        },
        sidebar: {
          bg: '#0F172A',
          hover: '#1E293B',
          active: '#1E3A5F',
          text: '#94A3B8',
          textActive: '#F8FAFC',
        },
        surface: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
