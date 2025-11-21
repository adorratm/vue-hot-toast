import { defineNuxtModule, addComponent, addPlugin, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@adorratm/vue-hot-toast',
    configKey: 'vueHotToast',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {},
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Add Toaster component
    addComponent({
      name: 'Toaster',
      export: 'default',
      filePath: '@adorratm/vue-hot-toast/Toaster.vue',
    })

    // Always add plugin for global config
    addPlugin({
      src: resolver.resolve('./runtime/plugin.mjs'),
      mode: 'client',
    })
  },
})

// Ensure default export
export { default }
