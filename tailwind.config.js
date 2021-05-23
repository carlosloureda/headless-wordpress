// const  defaultTheme =  require('tailwindcss/defaultTheme')

const teal = {
  100: '#d7e9eb',
  200: '#aed4d7',
  300: '#86bec4',
  400: '#5da9b0',
  500: '#35939c',
  600: '#2a767d',
  700: '#20585e',
  800: '#153b3e',
  900: '#0b1d1f',
}

module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './public/**/*.html',
      './pages/**/*.{js,ts,jsx,tsx}',
      './lib/components/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      keyframes: true,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    // ...defaultTheme,
    extend: {
      colors: {
        teal,
        primary: teal[500],
        darkGrey: '#737373',
        lightGrey: '#d9d9d9',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
