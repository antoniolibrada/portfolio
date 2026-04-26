import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import postcssPresetEnv from 'postcss-preset-env'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // Readable names in dev; short hash in prod
      generateScopedName: process.env.NODE_ENV === 'production'
        ? '[hash:base64:5]'
        : '[name]_[local]',
    },
    preprocessorOptions: {
      scss: {
        // Allow @use 'variables' without relative paths in any .module.scss
        loadPaths: [resolve(__dirname, 'src/styles')],
      },
    },
    postcss: {
      plugins: [
        autoprefixer(),
        postcssPresetEnv({
          stage: 2,
          features: {
            // Needed: project uses oklch() throughout
            'color-function': true,
            'oklab-function': true,
          },
        }),
      ],
    },
  },
})
