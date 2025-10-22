/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensures Tailwind scans all source files
  theme: {
    extend: {
      colors: {
        'aspac-green': '#459243',
        'aspac-yellow': '#ebd839',

        // optional semantic aliases
        primary: '#459243',
        accent: '#ebd839',
      },
    },
  },
  plugins: [],
};
