module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Barlow: ["Barlow", "sans-serif"],
      },
      colors: {
        primary: "#0d2e68",
        "primary-dark": "#000035",
        "primary-darker": "#00001c",
        material: "#051738",
        accent: "#5df99c",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("tailwind-scrollbar")],
};
