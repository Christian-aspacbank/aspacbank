// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        aspac: {
          green:  "#459243", // brand green
          greenAA:"#3e833c", // darker green for white text (4.5:1)
          yellow: "#ebd839"  // brand yellow
        }
      }
    }
  },
  plugins: []
}
