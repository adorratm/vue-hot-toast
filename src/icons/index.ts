import type { ToastType, IconProvider } from '../types'

export const defaultIcons: Record<ToastType, string> = {
  success: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7 10L9 12L13 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  error: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/>
    <path d="M10 6V10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="10" cy="13" r="1" fill="currentColor"/>
  </svg>`,
  loading: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="vue-hot-toast-spinner">
    <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" stroke-dasharray="31.416" stroke-dashoffset="31.416" fill="none" stroke-linecap="round">
      <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416;0 31.416" repeatCount="indefinite"/>
      <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416;-31.416" repeatCount="indefinite"/>
    </circle>
  </svg>`,
  info: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/>
    <path d="M10 6V10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="10" cy="13" r="1" fill="currentColor"/>
  </svg>`,
  warning: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2L2 18H18L10 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 8V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="10" cy="15" r="1" fill="currentColor"/>
  </svg>`,
  blank: '',
  custom: '',
}

export function getDefaultIcon(type: ToastType): string {
  return defaultIcons[type] || ''
}

const iconProvider: IconProvider = {
  getIcon: (type: ToastType) => getDefaultIcon(type),
}

export { iconProvider }

