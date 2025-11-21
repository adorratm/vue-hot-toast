import type { ToastAnimation } from '../types'

export const animationClasses: Record<ToastAnimation, {
  enter: string
  enterActive: string
  enterTo: string
  leave: string
  leaveActive: string
  leaveTo: string
}> = {
  slide: {
    enter: 'vue-hot-toast-enter',
    enterActive: 'vue-hot-toast-enter-active',
    enterTo: 'vue-hot-toast-enter-to',
    leave: 'vue-hot-toast-leave',
    leaveActive: 'vue-hot-toast-leave-active',
    leaveTo: 'vue-hot-toast-leave-to',
  },
  fade: {
    enter: 'vue-hot-toast-fade-enter',
    enterActive: 'vue-hot-toast-fade-enter-active',
    enterTo: 'vue-hot-toast-fade-enter-to',
    leave: 'vue-hot-toast-fade-leave',
    leaveActive: 'vue-hot-toast-fade-leave-active',
    leaveTo: 'vue-hot-toast-fade-leave-to',
  },
  scale: {
    enter: 'vue-hot-toast-scale-enter',
    enterActive: 'vue-hot-toast-scale-enter-active',
    enterTo: 'vue-hot-toast-scale-enter-to',
    leave: 'vue-hot-toast-scale-leave',
    leaveActive: 'vue-hot-toast-scale-leave-active',
    leaveTo: 'vue-hot-toast-scale-leave-to',
  },
  zoom: {
    enter: 'vue-hot-toast-zoom-enter',
    enterActive: 'vue-hot-toast-zoom-enter-active',
    enterTo: 'vue-hot-toast-zoom-enter-to',
    leave: 'vue-hot-toast-zoom-leave',
    leaveActive: 'vue-hot-toast-zoom-leave-active',
    leaveTo: 'vue-hot-toast-zoom-leave-to',
  },
  bounce: {
    enter: 'vue-hot-toast-bounce-enter',
    enterActive: 'vue-hot-toast-bounce-enter-active',
    enterTo: 'vue-hot-toast-bounce-enter-to',
    leave: 'vue-hot-toast-bounce-leave',
    leaveActive: 'vue-hot-toast-bounce-leave-active',
    leaveTo: 'vue-hot-toast-bounce-leave-to',
  },
  none: {
    enter: '',
    enterActive: '',
    enterTo: '',
    leave: '',
    leaveActive: '',
    leaveTo: '',
  },
  custom: {
    enter: 'vue-hot-toast-custom-enter',
    enterActive: 'vue-hot-toast-custom-enter-active',
    enterTo: 'vue-hot-toast-custom-enter-to',
    leave: 'vue-hot-toast-custom-leave',
    leaveActive: 'vue-hot-toast-custom-leave-active',
    leaveTo: 'vue-hot-toast-custom-leave-to',
  },
}

export function getAnimationName(animation: ToastAnimation, reverse: boolean = false): string {
  if (animation === 'none') return ''
  const baseName = animation === 'custom' ? 'custom' : animation
  return reverse ? `toast-list-reverse-${baseName}` : `toast-list-${baseName}`
}

