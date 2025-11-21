<template>
  <div
    v-if="toasts.length > 0"
    :class="[containerClassName, themeClass]"
    :style="containerStyle"
    aria-live="polite"
    aria-label="Notifications"
  >
    <div
      v-for="position in positions"
      :key="position"
      :class="getPositionClasses(position)"
      :style="getPositionStyles(position)"
    >
      <transition-group
        :name="getTransitionName(position)"
        tag="div"
      >
        <div
          v-for="toast in getToastsByPosition(position)"
          :key="toast.id"
          :class="getToastClasses(toast)"
          :style="getToastStyles(toast)"
          :role="toast.ariaProps?.role || 'status'"
          :aria-live="toast.ariaProps?.['aria-live'] || 'polite'"
        >
          <div class="vue-hot-toast-content">
            <span
              v-if="toast.icon && typeof toast.icon === 'string'"
              class="vue-hot-toast-icon"
              v-html="toast.icon"
            />
            <component
              v-else-if="toast.icon && typeof toast.icon === 'function'"
              :is="toast.icon()"
              class="vue-hot-toast-icon"
            />
            <div class="vue-hot-toast-message">
              <span
                v-if="typeof toast.message === 'string'"
                v-html="toast.message"
              />
              <component
                v-else
                :is="toast.message()"
              />
            </div>
            <button
              v-if="toast.action"
              :class="['vue-hot-toast-action-button', toast.action.className]"
              :style="toast.action.style"
              @click="toast.action.onClick"
            >
              {{ toast.action.label }}
            </button>
            <button
              v-if="shouldShowCloseButton(toast)"
              class="vue-hot-toast-close-button"
              @click="dismissToast(toast.id)"
              aria-label="Close notification"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { toastState } from './store'
import { dismissToast } from './core'
import { getConfig } from './config'
import { getThemeColors, getColorForType } from './themes'
import { getAnimationName } from './animations'

export default {
  name: 'Toaster',
  props: {
    position: {
      type: String,
      default: 'top-center',
    },
    reverseOrder: {
      type: Boolean,
      default: false,
    },
    gutter: {
      type: Number,
      default: 8,
    },
    containerClassName: {
      type: String,
      default: 'vue-hot-toast-container',
    },
    containerStyle: {
      type: Object,
      default: () => ({}),
    },
    toastOptions: {
      type: Object,
      default: () => ({}),
    },
    theme: {
      type: String,
      default: 'light',
    },
    animation: {
      type: String,
      default: 'slide',
    },
    richColors: {
      type: Boolean,
      default: true,
    },
    closeButton: {
      type: Boolean,
      default: true,
    },
    maxToasts: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      unsubscribe: null,
    }
  },
  computed: {
    toasts() {
      return toastState.toasts.value || []
    },
    themeClass() {
      const theme = this.theme || getConfig().theme
      return `vue-hot-toast-theme-${theme}`
    },
    positions() {
      return [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ]
    },
  },
  mounted() {
    this.unsubscribe = toastState.subscribe(() => {
      this.$forceUpdate()
    })
  },
  beforeUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  },
  methods: {
    getToastsByPosition(position) {
      return this.toasts.filter((toast) => toast.position === position)
    },
    getTransitionName(position) {
      const animation = this.animation || getConfig().animation
      return getAnimationName(animation, this.reverseOrder)
    },
    getPositionClasses(position) {
      return `vue-hot-toast-wrapper vue-hot-toast-wrapper--${position}`
    },
    getPositionStyles(position) {
      const styles = {
        position: 'fixed',
        zIndex: '9999',
        pointerEvents: 'none',
      }

      const gutter = this.gutter ?? getConfig().gutter

      if (position.includes('top')) {
        styles.top = `${gutter}px`
      } else {
        styles.bottom = `${gutter}px`
      }

      if (position.includes('left')) {
        styles.left = `${gutter}px`
      } else if (position.includes('right')) {
        styles.right = `${gutter}px`
      } else {
        styles.left = '50%'
        styles.transform = 'translateX(-50%)'
      }

      return styles
    },
    getToastClasses(toast) {
      const classes = ['vue-hot-toast', `vue-hot-toast--${toast.type}`]
      const theme = toast.theme || this.theme || getConfig().theme
      classes.push(`vue-hot-toast-theme-${theme}`)
      
      if (toast.className) {
        classes.push(toast.className)
      }
      if (!toast.visible) {
        classes.push('vue-hot-toast--hidden')
      }
      return classes.join(' ')
    },
    getToastStyles(toast) {
      const styles = {
        pointerEvents: 'auto',
      }

      const theme = toast.theme || this.theme || getConfig().theme
      const richColors = toast.richColors ?? this.richColors ?? getConfig().richColors

      if (richColors && toast.type !== 'blank' && toast.type !== 'custom') {
        const color = getColorForType(toast.type, theme)
        
        if (toast.type === 'success' || toast.type === 'error' || toast.type === 'loading' || toast.type === 'info' || toast.type === 'warning') {
          styles.borderLeftColor = color
        }
      }

      if (toast.style) {
        Object.assign(styles, toast.style)
      }

      return styles
    },
    shouldShowCloseButton(toast) {
      if (toast.duration === Infinity) return true
      const closeButton = toast.closeButton ?? this.closeButton ?? getConfig().closeButton
      return closeButton && toast.duration !== Infinity
    },
    dismissToast,
  },
}
</script>

<style scoped>
.vue-hot-toast-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.vue-hot-toast-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 420px;
  width: 100%;
}

.vue-hot-toast {
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 16px;
  font-size: 14px;
  line-height: 1.5;
  min-width: 300px;
  max-width: 420px;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
}

.vue-hot-toast-theme-light {
  background: #ffffff;
  color: #363636;
}

.vue-hot-toast-theme-dark {
  background: #1f2937;
  color: #f9fafb;
}

.vue-hot-toast--hidden {
  opacity: 0;
  transform: scale(0.8);
}

.vue-hot-toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.vue-hot-toast-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vue-hot-toast-icon >>> svg,
.vue-hot-toast-icon ::v-deep svg {
  width: 100%;
  height: 100%;
}

.vue-hot-toast-message {
  flex: 1;
  word-break: break-word;
}

.vue-hot-toast-action-button {
  flex-shrink: 0;
  padding: 6px 12px;
  margin-left: 8px;
  background: transparent;
  border: 1px solid currentColor;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}

.vue-hot-toast-action-button:hover {
  background: rgba(0, 0, 0, 0.05);
}

.vue-hot-toast-theme-dark .vue-hot-toast-action-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.vue-hot-toast-close-button {
  flex-shrink: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: color 0.2s;
  margin-left: 8px;
}

.vue-hot-toast-close-button:hover {
  color: #363636;
}

.vue-hot-toast-theme-dark .vue-hot-toast-close-button {
  color: #9ca3af;
}

.vue-hot-toast-theme-dark .vue-hot-toast-close-button:hover {
  color: #f9fafb;
}

/* Animations */
.toast-list-slide-enter-active,
.toast-list-slide-leave-active {
  transition: all 0.3s ease;
}

.toast-list-slide-enter,
.toast-list-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.toast-list-reverse-slide-enter-active,
.toast-list-reverse-slide-leave-active {
  transition: all 0.3s ease;
}

.toast-list-reverse-slide-enter,
.toast-list-reverse-slide-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

.toast-list-fade-enter-active,
.toast-list-fade-leave-active {
  transition: opacity 0.3s ease;
}

.toast-list-fade-enter,
.toast-list-fade-leave-to {
  opacity: 0;
}

.toast-list-scale-enter-active,
.toast-list-scale-leave-active {
  transition: all 0.3s ease;
}

.toast-list-scale-enter,
.toast-list-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.toast-list-zoom-enter-active,
.toast-list-zoom-leave-active {
  transition: all 0.2s ease;
}

.toast-list-zoom-enter,
.toast-list-zoom-leave-to {
  opacity: 0;
  transform: scale(0);
}

.toast-list-bounce-enter-active {
  animation: bounce-in 0.5s;
}

.toast-list-bounce-leave-active {
  animation: bounce-out 0.3s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

/* Spinner animation */
.vue-hot-toast-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
