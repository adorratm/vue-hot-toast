// Toaster component is exported separately - Vue files are handled by bundlers
// Toaster component - import directly from 'vue-hot-toast/Toaster.vue' or use your bundler
// export { default as Toaster } from './Toaster.vue'

export {
  toast,
  successToast,
  errorToast,
  loadingToast,
  infoToast,
  warningToast,
  customToast,
  dismissToast,
  removeToast,
  promiseToast,
} from './core'
export { toastState } from './store'
export { setConfig, getConfig, resetConfig } from './config'
export { registerPlugin, unregisterPlugin, getPlugin, registerIconProvider, getIconProvider } from './plugins'
export { setThemeColors, getThemeColors, getColorForType } from './themes'
export { getDefaultIcon } from './icons'
export type {
  Toast,
  ToastType,
  ToastOptions,
  ToastPosition,
  ToastTheme,
  ToastAnimation,
  ToasterProps,
  ToastPlugin,
  IconProvider,
  ToastAction,
  ToastColors,
} from './types'

// Default export for convenience
import toastFn from './core'
export default toastFn
