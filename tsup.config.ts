import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/slide-deck.tsx',
    'src/slide-demo-content.tsx',
    'src/primitives.tsx',
    'src/slide-link.tsx',
    'src/get-slide.tsx',
    'src/cn.ts',
    'src/types.ts',
  ],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  bundle: false,
  external: ['react', 'react-dom', 'next'],
  onSuccess: 'cp src/slides.css dist/slides.css',
});
