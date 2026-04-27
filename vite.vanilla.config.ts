import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import postcssPresetEnv from 'postcss-preset-env'
import { resolve } from 'path'

// No React plugin — pure vanilla TypeScript build.
export default defineConfig({
  server: {
    port: 5174,
  },
  build: {
    outDir: 'dist-vanilla',
    rollupOptions: {
      input: resolve(__dirname, 'index-vanilla.html'),
    },
  },
  css: {
    modules: {
      generateScopedName: process.env.NODE_ENV === 'production'
        ? '[hash:base64:5]'
        : '[name]_[local]',
    },
    preprocessorOptions: {
      scss: {
        // Shared with the React build: @use 'variables' resolves to src/styles/variables.scss
        loadPaths: [resolve(__dirname, 'src/styles')],
      },
    },
    postcss: {
      plugins: [
        autoprefixer(),
        postcssPresetEnv({
          stage: 2,
          features: {
            'color-function': true,
            'oklab-function': true,
          },
        }),
      ],
    },
  },
})
