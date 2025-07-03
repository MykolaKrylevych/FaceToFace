 /** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{html,js}"],
   theme: {
     extend: {
      boxShadow: {
              'btn-hover-blue': '0 8px 15px rgba(59,130,246,0.4)',
              'btn-active-blue': '0 4px 6px rgba(59,130,246,0.6)',
              'btn-hover-green': '0 8px 15px rgba(34,197,94,0.5)',
              'btn-active-green': '0 4px 6px rgba(34,197,94,0.7)',
            },

     },
   },
   plugins: [],
 }