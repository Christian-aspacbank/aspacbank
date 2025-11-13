/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "aspac-green": "#459243",
        "aspac-yellow": "#EBD839",

        // semantic names
        primary: "#459243",
        accent: "#EBD839",
      },
    },
  },
  plugins: [],
};
