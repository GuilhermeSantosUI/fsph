/** @type {import('tailwindcss').Config} */
const withOpacity =
  (variable) =>
  ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Use the RGB custom property to allow Tailwind classes to control opacity.
        // Example: bg-primary/80 -> rgb(var(--primary-rgb) / 0.8)
        primary: withOpacity('--primary-rgb'),
      },
    },
  },
  plugins: [],
};
