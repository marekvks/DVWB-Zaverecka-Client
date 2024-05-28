/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      blackBackground: '#161616',
      grey: '#464646',
      greyText: '#C9C9C9',
      white: '#fff',
      greenBright: '#00EB96',
      greenDark: '#006742',
      greenLinkHover: '#00c27b',
    }
  },
  plugins: [],
}