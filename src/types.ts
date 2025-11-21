export type ToastType = 'success' | 'error' | 'loading' | 'blank' | 'custom' | 'info' | 'warning'

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export type ToastTheme = 'light' | 'dark' | 'auto' | 'custom'

export type ToastAnimation =
  | 'slide'
  | 'fade'
  | 'scale'
  | 'zoom'
  | 'bounce'
  | 'none'
  | 'custom'

export interface ToastIcon {
  success?: string | (() => any)
  error?: string | (() => any)
  loading?: string | (() => any)
  info?: string | (() => any)
  warning?: string | (() => any)
  blank?: string | (() => any)
}

export interface ToastColors {
  success?: string
  error?: string
  loading?: string
  info?: string
  warning?: string
  background?: string
  text?: string
  border?: string
}

export interface Toast {
  id: string
  type: ToastType
  message: string | (() => any)
  duration?: number
  icon?: string | (() => any)
  ariaProps?: {
    role: 'status' | 'alert'
    'aria-live': 'assertive' | 'polite'
  }
  style?: Record<string, any>
  className?: string
  position?: ToastPosition
  createdAt: number
  visible: boolean
  height?: number
  theme?: ToastTheme
  animation?: ToastAnimation
  action?: ToastAction
}

export interface ToastAction {
  label: string
  onClick: () => void
  style?: Record<string, any>
  className?: string
}

export interface ToastOptions {
  duration?: number
  position?: ToastPosition
  icon?: string | (() => any)
  style?: Record<string, any>
  className?: string
  ariaProps?: {
    role?: 'status' | 'alert'
    'aria-live'?: 'assertive' | 'polite'
  }
  theme?: ToastTheme
  animation?: ToastAnimation
  action?: ToastAction
  id?: string
  richColors?: boolean
  closeButton?: boolean
}

export interface ToasterProps {
  position?: ToastPosition
  reverseOrder?: boolean
  gutter?: number
  containerClassName?: string
  containerStyle?: Record<string, any>
  toastOptions?: ToastOptions
  theme?: ToastTheme
  animation?: ToastAnimation
  richColors?: boolean
  closeButton?: boolean
  maxToasts?: number
}

export interface ToastPlugin {
  name: string
  install: (config: any) => void
}

export interface IconProvider {
  getIcon: (type: ToastType) => string | (() => any) | undefined
}
