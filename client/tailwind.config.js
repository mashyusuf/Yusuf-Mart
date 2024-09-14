/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this path based on your file structure
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

