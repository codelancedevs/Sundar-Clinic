module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff0000ff',
        secondary: '#ffffffff',
        accentP: '#5299d3ff',
        accentS: '#9381ffff'
      },
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
};
