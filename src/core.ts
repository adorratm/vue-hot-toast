import { toastState } from './store'
import { getConfig } from './config'
import { getIconProvider } from './plugins'
import { getDefaultIcon } from './icons'
import type { Toast, ToastOptions, ToastType } from './types'

let toastCount = 0

function createToast(
  message: string | (() => any),
  type: ToastType = 'blank',
  options?: ToastOptions
): string {
  const config = getConfig()
  const id = options?.id || `toast-${++toastCount}-${Date.now()}`
  const duration = options?.duration ?? config.duration
  const position = options?.position ?? config.position
  const theme = options?.theme ?? config.theme
  const animation = options?.animation ?? config.animation

  // Get icon from provider or use default
  let icon = options?.icon
  if (!icon && type !== 'blank' && type !== 'custom') {
    const iconProvider = getIconProvider()
    if (iconProvider) {
      icon = iconProvider.getIcon(type)
    }
    if (!icon) {
      icon = getDefaultIcon(type)
    }
  }

  const toast: Toast = {
    id,
    type,
    message,
    duration,
    position,
    theme,
    animation,
    icon,
    style: options?.style,
    className: options?.className,
    action: options?.action,
    ariaProps: {
      role: type === 'error' ? 'alert' : 'status',
      'aria-live': type === 'error' ? 'assertive' : 'polite',
      ...options?.ariaProps,
    },
    createdAt: Date.now(),
    visible: true,
  }

  // Apply max toasts limit
  const currentToasts = toastState.toasts.value || []
  if (currentToasts.length >= config.maxToasts) {
    const oldestToast = currentToasts[0]
    if (oldestToast) {
      toastState.remove(oldestToast.id)
    }
  }

  toastState.add(toast)

  if (duration > 0 && duration !== Infinity) {
    setTimeout(() => {
      dismissToast(id)
    }, duration)
  }

  return id
}

export function toast(
  message: string | (() => any),
  options?: ToastOptions
): string {
  return createToast(message, 'blank', options)
}

export function successToast(
  message: string | (() => any),
  options?: ToastOptions
): string {
  return createToast(message, 'success', options)
}

export function errorToast(
  message: string | (() => any),
  options?: ToastOptions
): string {
  return createToast(message, 'error', options)
}

export function loadingToast(
  message: string | (() => any),
  options?: ToastOptions
): string {
  return createToast(message, 'loading', { ...options, duration: Infinity })
}

export function infoToast(
  message: string | (() => any),
  options?: ToastOptions
): string {
  return createToast(message, 'info', options)
}

export function warningToast(
  message: string | (() => any),
  options?: ToastOptions
): string {
  return createToast(message, 'warning', options)
}

export function customToast(
  message: string | (() => any),
  options?: ToastOptions
): string {
  return createToast(message, 'custom', options)
}

export function dismissToast(id?: string) {
  if (id) {
    toastState.update(id, { visible: false })
    setTimeout(() => {
      toastState.remove(id)
    }, 200)
  } else {
    const currentToasts = toastState.toasts.value || []
    currentToasts.forEach((toast) => {
      toastState.update(toast.id, { visible: false })
    })
    setTimeout(() => {
      toastState.clear()
    }, 200)
  }
}

export function removeToast(id: string) {
  toastState.remove(id)
}

export function promiseToast<T>(
  promise: Promise<T>,
  messages: {
    loading: string | (() => any)
    success: string | ((data: T) => any)
    error: string | ((error: any) => any)
  },
  options?: ToastOptions
): Promise<T> {
  const loadingId = loadingToast(messages.loading, options)

  return promise
    .then((data) => {
      dismissToast(loadingId)
      successToast(
        typeof messages.success === 'function'
          ? messages.success(data)
          : messages.success,
        options
      )
      return data
    })
    .catch((error) => {
      dismissToast(loadingId)
      errorToast(
        typeof messages.error === 'function'
          ? messages.error(error)
          : messages.error,
        options
      )
      throw error
    })
}

// Default export
export default toast
