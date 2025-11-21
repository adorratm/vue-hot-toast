import { defineNuxtPlugin } from '#app'
import { setConfig } from 'vue-hot-toast'

export default defineNuxtPlugin((nuxtApp) => {
  const config = nuxtApp.$config?.public?.vueHotToast || {}
  
  if (Object.keys(config).length > 0) {
    setConfig(config)
  }
})

