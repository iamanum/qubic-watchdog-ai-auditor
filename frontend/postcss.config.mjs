// frontend/postcss.config.mjs
import { join } from 'path';

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Replaced with the official, stable plugin
    '@tailwindcss/postcss': {
      config: join(process.cwd(), 'tailwind.config.ts'),
    },
    'autoprefixer': {},
  },
};

export default config;