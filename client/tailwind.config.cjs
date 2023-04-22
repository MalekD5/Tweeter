/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        bordergray: '#2f3336',
        textgray: '#6c7075',
        search: '#202327'
      }
    }
  },
  plugins: []
};
