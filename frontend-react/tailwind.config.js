/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'btn-hover-blue': '0 8px 15px rgba(59,130,246,0.4)',
        'btn-active-blue': '0 4px 6px rgba(59,130,246,0.6)',
        'btn-hover-green': '0 8px 15px rgba(34,197,94,0.5)',
        'btn-active-green': '0 4px 6px rgba(34,197,94,0.7)',
      },
      keyframes: {
        'gradient-move': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'gradient-move': 'gradient-move 8s ease infinite',
        float: 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
