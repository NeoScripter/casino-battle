import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
    build: {
        outDir: 'docs'
    },
    plugins: [tailwindcss()],
    base: './'
});
