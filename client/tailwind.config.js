/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Use class-based dark mode instead of media query
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
        ],
      },
  
    },
  },
  plugins: [],
};
