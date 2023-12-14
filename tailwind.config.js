/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  purge: {
    content: [
      './src/**/*.html',
      '!.app/components/filter/filter.component.html',
    ],
  },
};
