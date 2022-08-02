/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    purge: ["./src/**/*.vue", "./public/index.html"],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                // ...colors,
                'text-color': '#0B132A',
                'main-brown': '#4F2F2F',
                'main-blue': '#1EA9E4',
                'main-red': '#F44336',
                'main-black': '#0B132A',
                'main-brown-light': '#8D3F3F',
            }
        },
        fontFamily: {
            barlow: ['Barlow', 'sans-serif'],
            berkshire: ['Berkshire Swash', 'cursive'],
        },
    },
    plugins: [],
}