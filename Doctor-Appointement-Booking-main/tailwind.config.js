// tailwind.config.js
module.exports = {
  content: [
    "./index.html", // If you're using plain HTML
    "./src/**/*.{js,jsx,ts,tsx}", // If you're using React
  ],
  theme: {
    extend: {
      colors:{
        'primary':"#5f6FFF"
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill,minmax(250px,1fr))'
      }
    },
  },
  plugins: [],
};
