module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'tokyo-night-storm': '#a9b1d6',
        'tokyo-night-rain': '#2ac3de',
        'tokyo-night-sakura': '#f7768e',
        'tokyo-night-tea': '#9ece6a',
        'tokyo-night-gold': '#e0af68',
        'tokyo-night-midnight': '#1a1b26',
        'tokyo-night-skyline': '#414868',
        'tokyo-night-sushi': '#ff9e64',
        'tokyo-night-ramen': '#7aa2f7',
        'tokyo-night-wasabi': '#7dcfff',
        'tokyo-night-sake': '#bb9af7',
        'tokyo-night-ume': '#f7768e',
        'tokyo-night-matcha': '#9ece6a',
        'tokyo-night-miso': '#e0af68',
        'tokyo-night-konbu': '#414868',
        'tokyo-night-sunrise': '#7aa2f7',
        'tokyo-night-sunset': '#ff9e64',
        'tokyo-night-zen': '#7dcfff',
        'tokyo-night-geisha': '#bb9af7',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}
