import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';


export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	optimizeDeps: {
    esbuildOptions: {
      supported: {
            'top-level-await': true //browsers can handle top-level-await features
          },
    }
  },
  esbuild: {
      supported: {
        'top-level-await': true //browsers can handle top-level-await features
      },
  },
});
