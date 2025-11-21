import { setConfig } from 'vue-hot-toast'

export default function (context, inject) {
  const config = context.app.$config?.vueHotToast || {}
  
  if (Object.keys(config).length > 0) {
    setConfig(config)
  }

  // Inject toast functions
  const toast = require('vue-hot-toast')
  
  inject('toast', toast.toast)
  inject('toastSuccess', toast.successToast)
  inject('toastError', toast.errorToast)
  inject('toastLoading', toast.loadingToast)
  inject('toastInfo', toast.infoToast)
  inject('toastWarning', toast.warningToast)
  inject('toastCustom', toast.customToast)
  inject('toastDismiss', toast.dismissToast)
  inject('toastRemove', toast.removeToast)
  inject('toastPromise', toast.promiseToast)
}

