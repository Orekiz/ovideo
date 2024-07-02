
import { defineConfig, presetUno, presetIcons, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetUno({
      preflight: true
    }),
    presetIcons()
  ],
  shortcuts: {
    'my-button': 'p-2 rounded-lg border-2 border-transparent cursor-pointer bg-gray-500/20 @dark:bg-neutral-300/30 hover:my-button-active transition',
    'my-button-active': 'border-(2 solid violet-700) color-violet-700 @dark:(color-violet-400 border-violet-400)',
    'text-sub': 'text-gray-500 @dark:text-gray-400'
  },
  transformers: [
    transformerVariantGroup(),
  ],
})