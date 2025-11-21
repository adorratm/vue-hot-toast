import type { ToastOptions, ToastPosition, ToastTheme, ToastAnimation } from './types'

export interface ToastConfig {
  duration: number
  position: ToastPosition
  theme: ToastTheme
  animation: ToastAnimation
  gutter: number
  containerClassName: string
  containerStyle: Record<string, any>
  defaultOptions: ToastOptions
  maxToasts: number
  richColors: boolean
  closeButton: boolean
}

const defaultConfig: ToastConfig = {
  duration: 4000,
  position: 'top-center',
  theme: 'light',
  animation: 'slide',
  gutter: 8,
  containerClassName: 'vue-hot-toast-container',
  containerStyle: {},
  defaultOptions: {},
  maxToasts: 5,
  richColors: true,
  closeButton: true,
}

let globalConfig: ToastConfig = { ...defaultConfig }

export function setConfig(config: Partial<ToastConfig>) {
  globalConfig = { ...globalConfig, ...config }
}

export function getConfig(): ToastConfig {
  return { ...globalConfig }
}

export function resetConfig() {
  globalConfig = { ...defaultConfig }
}

