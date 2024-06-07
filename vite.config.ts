import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import UnoCSS from 'unocss/vite'
import { presetUno } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS({
      presets: [
        presetUno({
          preflight: true
        }),
      ],
      shortcuts: {
        'my-button': 'p-2 rounded-lg border-2 border-transparent cursor-pointer hover:my-button-active transition',
        'my-button-active': 'border-2 border-solid border-violet-700 color-violet-700 @dark:color-violet-400 @dark:border-violet-400',
        'text-sub': 'text-gray-500 @dark:text-gray-400'
      }
    }),
  ],
})
