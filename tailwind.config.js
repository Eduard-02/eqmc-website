/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.75rem',
        sm: '0.875rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.25rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        base: '#2A2936',
        card: '#343344',
        border: '#403F4F',
        text: '#E7E6EE',
        muted: '#B8B7C2',
        accent: '#A7B3D4',
        accent2: '#C3BAD8',
        highlight: '#f8f6ff',
      },
      fontFamily: {
        sans: ['"Montserrat"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Inter', 'Arial', 'sans-serif'],
        script: ['"Dawning of a New Day"', 'cursive'],
        serif: ['"EB Garamond"', '"Times New Roman"', 'serif'],
      },
      backgroundImage: {
        page: "url('/assets/new-background.png')",
      },
      boxShadow: {
        card: '0 20px 40px rgba(0, 0, 0, 0.22)',
        cover: '0 20px 42px rgba(0, 0, 0, 0.32)',
      },
    },
  },
  plugins: [],
}
