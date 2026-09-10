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
        // WCAG-safe darker green for small/normal-weight text on white or
        // accent-yellow backgrounds, where "primary" alone falls short of
        // the 4.5:1 contrast ratio required for non-large text.
        "primary-dark": "#1c3a1c",
      },
       keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '60%': { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
        animation: {
        'wave-hand': 'wave 2.5s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
