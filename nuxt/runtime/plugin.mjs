import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(async () => {
  try {
    const { setConfig } = await import('@adorratm/vue-hot-toast')
    const config = useRuntimeConfig()
    const toastConfig = config.public?.vueHotToast || {}
    
    if (Object.keys(toastConfig).length > 0) {
      setConfig(toastConfig)
    }
  } catch (error) {
    console.warn('vue-hot-toast plugin error:', error)
  }
})
