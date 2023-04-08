/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-and-drop": {
          'from': { opacity: "0", transform: "translateY(-5px)" },
          'to': { opacity: "1", transform: "translateY(0)" },
        }
      },
      animation: {
        "fade-and-drop": 'fade-and-drop 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
}
