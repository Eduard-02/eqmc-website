/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    container: {
      center: true,
      // One consistent gutter scale. Adjust if you want tighter/looser.
      padding: {
        DEFAULT: '1rem',   // 16px (phones)
        sm: '1.25rem',     // 20px
        md: '1.5rem',      // 24px
        lg: '2rem',        // 32px (tablets / small laptops)
        xl: '3rem',        // 48px (desktop)
        '2xl': '3.5rem',   // 56px (very wide)
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
