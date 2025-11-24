import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { setConfig } from '@adorratm/vue-hot-toast'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const toastConfig = config.public?.vueHotToast || {}
  
  if (Object.keys(toastConfig).length > 0) {
    setConfig(toastConfig)
  }
})
