import { defineNuxtModule, addComponent } from '@nuxt/kit'

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
    // Add Toaster component using package export path
    addComponent({
      name: 'Toaster',
      export: 'default',
      filePath: '@adorratm/vue-hot-toast/Toaster.vue',
    })
  },
})
