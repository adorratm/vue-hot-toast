import { defineNuxtModule, addComponent, addPlugin, createResolver } from '@nuxt/kit'
import type { ToastConfig } from '../src/config'

export interface ModuleOptions extends Partial<ToastConfig> {
  // Module specific options
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vue-hot-toast',
    configKey: 'vueHotToast',
    compatibility: {
      nuxt: '>=4.0.0',
    },
  },
  defaults: {},
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Add Toaster component
    addComponent({
      name: 'Toaster',
      export: 'Toaster',
      filePath: 'vue-hot-toast',
    })

    // Add plugin for global config
    if (Object.keys(options).length > 0) {
      addPlugin({
        src: resolver.resolve('./runtime/plugin'),
        mode: 'client',
      })
    }
  },
})

