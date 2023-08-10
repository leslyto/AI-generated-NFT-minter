module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        play: ['Play', 'sans-serif'],
      },
      colors: {},
      fontSize: {
        '7xl': '2.5em',
      },
      width: {
        100: 400,
        128: 512,
        150: 600,
      },
      height: {
        100: 400,
        128: 512,
      },
      minHeight: {
        150: 600,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
