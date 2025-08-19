// tailwind.config.js
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}', // đường dẫn code React
    ],
    theme: {
        extend: {
            colors: {
                primaryBg: '#e6f0fa', // màu nền tái sử dụng
            },
        },
    },
    plugins: [],
};
