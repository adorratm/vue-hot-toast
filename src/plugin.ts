import type { App } from 'vue'
import { setConfig } from './config'
import * as toastCore from './core'
import type { ToastConfig } from './config'

export interface VueHotToastPluginOptions extends Partial<ToastConfig> {
  // Additional plugin options
}

export default {
  install(app: App, options: VueHotToastPluginOptions = {}) {
    // Set global config
    if (Object.keys(options).length > 0) {
      setConfig(options)
    }

    // Make toast functions available globally
    const toastFunctions = {
      ...toastCore.toast,
      success: toastCore.successToast,
      error: toastCore.errorToast,
      loading: toastCore.loadingToast,
      info: toastCore.infoToast,
      warning: toastCore.warningToast,
      custom: toastCore.customToast,
      dismiss: toastCore.dismissToast,
      remove: toastCore.removeToast,
      promise: toastCore.promiseToast,
    }

    // Vue 3
    if (app.config && app.config.globalProperties) {
      app.config.globalProperties.$toast = toastFunctions
    }
    // Vue 2
    else if ((app as any).prototype) {
      (app as any).prototype.$toast = toastFunctions
    }
  },
}

