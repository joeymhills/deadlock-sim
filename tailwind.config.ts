import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  purge: {
    options: {
      content: ['./src/**/*.{js,ts,jsx,tsx}'], // Paths to your content files
      safelist: ['weapon', 'bg-weapon-bg-1', 'bg-weapon-bg-2', 'vitality', 'vitaliy-bg-1', 'vitality-bg-2', 'spirit', 'spirit-bg-1', 'spirit-bg-2'], // Add your dynamic class names here
    },
  },
  theme: {
    extend: {
      fontSize: {
        xxs: ['0.6rem', { lineHeight: '0.875rem' }]
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn .5s ease-in-out',
      },
      gradientColorStops: {
        'primary': '#4C1D95', // Custom color stops
        'secondary': '#34D399',
        'accent': '#F472B6',
      },
      colors: {
          'darker': '#121212',
          'dark': '#282828',
          'light': '#fca311',
          'accent': '#3f51b5',
          'accent-light': '#7074c6',


          'weapon': '#CE8E3F',
          'weapon-bg-1': '#523709',
          'weapon-bg-2': '#442C05',

          'vitality': '#74AF1C',
          'vitality-bg-1': '#325008',
          'vitality-bg-2': '#2B4406',

          'spirit': '#C288F2',
          'spirit-bg-1': '#3F2851',
          'spirit-bg-2': '#332044',

          'souls': '#6AFFDA',
          'offwhite': '#EFE2CB',
          'offwhite-dark': '#867B6A'
      },
      fontFamily: {
        colus: ['colus', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-sm': {
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', // Subtle shadow
        },
        '.text-shadow-md': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Slightly stronger shadow
        },
        '.text-shadow-lg': {
          textShadow: '4px 4px 8px rgba(0, 0, 0, 0.6)', // Stronger shadow
        },
      }, ['responsive', 'hover']);
    },
  ],
} satisfies Config;
