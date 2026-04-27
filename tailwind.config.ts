import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          600: '#0b6aa9',
          700: '#095a8f'
        }
      }
    }
  },
  plugins: [],
} satisfies Config;
