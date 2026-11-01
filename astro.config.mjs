// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.golfista.app',
  output: 'static',
  vite: {
    ssr: {
      noExternal: ['astro/jsx-runtime']
    }
  }
});
