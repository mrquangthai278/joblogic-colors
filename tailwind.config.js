/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

    theme: {
        extend: {
            container: {
                padding: '2rem',
            },

            fontFamily: {
                'roboto': ['"Roboto"', "sans-serif"]
            }
        },
    },
    plugins: [],
}