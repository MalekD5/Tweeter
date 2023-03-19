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
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#661AE6',
          secondary: '#D926AA',
          accent: '#1FB2A5',
          neutral: '#191D24',
          'base-100': '#000',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272'
        }
      }
    ]
  },
  plugins: [require('daisyui')]
};
