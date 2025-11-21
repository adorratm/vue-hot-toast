import type { ToastTheme, ToastColors } from '../types'

export const defaultColors: Record<ToastTheme, ToastColors> = {
  light: {
    success: '#10b981',
    error: '#ef4444',
    loading: '#3b82f6',
    info: '#3b82f6',
    warning: '#f59e0b',
    background: '#ffffff',
    text: '#363636',
    border: '#e5e7eb',
  },
  dark: {
    success: '#10b981',
    error: '#ef4444',
    loading: '#3b82f6',
    info: '#3b82f6',
    warning: '#f59e0b',
    background: '#1f2937',
    text: '#f9fafb',
    border: '#374151',
  },
  auto: {
    success: '#10b981',
    error: '#ef4444',
    loading: '#3b82f6',
    info: '#3b82f6',
    warning: '#f59e0b',
    background: 'var(--toast-bg, #ffffff)',
    text: 'var(--toast-text, #363636)',
    border: 'var(--toast-border, #e5e7eb)',
  },
  custom: {},
}

const customColors: ToastColors = {}

export function setThemeColors(theme: ToastTheme, colors: Partial<ToastColors>) {
  if (theme === 'custom') {
    Object.assign(customColors, colors)
  } else {
    Object.assign(defaultColors[theme], colors)
  }
}

export function getThemeColors(theme: ToastTheme): ToastColors {
  if (theme === 'custom') {
    return { ...defaultColors.light, ...customColors }
  }
  return defaultColors[theme] || defaultColors.light
}

export function getColorForType(type: string, theme: ToastTheme): string {
  const colors = getThemeColors(theme)
  return (colors[type as keyof ToastColors] as string) || colors.text || '#363636'
}

