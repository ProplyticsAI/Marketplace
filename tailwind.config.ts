import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(214 32% 91%)',
        background: 'hsl(210 20% 98%)',
        foreground: 'hsl(222 47% 11%)',
        primary: 'hsl(221 83% 53%)',
        muted: 'hsl(215 16% 47%)'
      }
    }
  },
  plugins: []
};

export default config;
