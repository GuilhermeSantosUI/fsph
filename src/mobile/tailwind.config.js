/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        outfit: [
          'Outfit-Regular',
          'Outfit-Thin',
          'Outfit-ExtraLight',
          'Outfit-Light',
          'Outfit-Medium',
          'Outfit-SemiBold',
          'Outfit-Bold',
          'Outfit-ExtraBold',
          'Outfit-Black',
        ],
        dmsans: ['DM Sans'],
      },
    },
  },
  plugins: [],
};
