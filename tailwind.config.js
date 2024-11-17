/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rich-black': '#0D1B1E',
        'superior-blue': '#7798AB',
        'tea-green': '#C3DBC5',
        'dutch-white': '#E8DCB9',
        'mimi-pink': '#F2CEE6',
        'dota-dark-tile-start': '#151616',
        'dota-dark-tile-end': '#040505',
        'dota-med-tile-start': '#252728',
        'dota-med-tile-end': '#101415',
        'dota-tab-background': '#313131',
        'dota-text-white': "#fff",
        'border-color': '#282828',
        'border-color-hover': '#D7D7D7',
        'dota-selection-green': '#5CAD5C'
      },
      backgroundImage: {
        'dota-dark-tile-background': 'linear-gradient(80deg, rgb(21, 22, 22) 0%, rgb(4, 5, 5) 100%)',
        'dota-med-tile-background': 'linear-gradient(80deg, #252728, #101415)',
        'dota-light-background': 'linear-gradient(60deg, #0f1114 30% , #4d5258)',
        'none': 'none'
      }
    },
  },
  plugins: [],
}