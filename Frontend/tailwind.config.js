/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5B6DF1", // Buttons, highlights
        secondary: "#6c7cf5", // Buttons hover
        tetriary: "#EEF2F8", // Input fields
      },
    },
  },
  plugins: [require("flowbite/plugin")],
}
