import { createReactive } from './utils/vue-compat'
import type { Toast } from './types'

const toastStateReactive = createReactive<Toast[]>([])
const toasts = toastStateReactive
const listeners: Array<(toasts: Toast[]) => void> = []

export const toastState = {
  get toasts() {
    return toasts
  },
  
  add(toast: Toast) {
    const current = toasts.value || []
    toasts.value = [...current, toast]
    listeners.forEach((listener) => listener(toasts.value))
  },
  
  remove(id: string) {
    const current = toasts.value || []
    toasts.value = current.filter((t) => t.id !== id)
    listeners.forEach((listener) => listener(toasts.value))
  },
  
  update(id: string, toast: Partial<Toast>) {
    const current = toasts.value || []
    toasts.value = current.map((t) =>
      t.id === id ? { ...t, ...toast } : t
    )
    listeners.forEach((listener) => listener(toasts.value))
  },
  
  subscribe(listener: (toasts: Toast[]) => void) {
    listeners.push(listener)
    return () => {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  },
  
  clear() {
    toasts.value = []
    listeners.forEach((listener) => listener(toasts.value))
  },
}
