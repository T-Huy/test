export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                'rotate-fast': 'rotate-fast 1s ease-in-out', // Animation chạy trong 1 giây
            },
            keyframes: {
                'rotate-fast': {
                    '0%': { transform: 'rotate(0deg)' },
                    '12.5%': { transform: 'rotate(30deg)' }, // Tăng tần suất xoay
                    '25%': { transform: 'rotate(-30deg)' },
                    '37.5%': { transform: 'rotate(30deg)' },
                    '50%': { transform: 'rotate(-30deg)' },
                    '62.5%': { transform: 'rotate(30deg)' },
                    '75%': { transform: 'rotate(-30deg)' },
                    '87.5%': { transform: 'rotate(30deg)' },
                    '100%': { transform: 'rotate(0deg)' },
                },
            },
        },
    },
    plugins: [],
};
