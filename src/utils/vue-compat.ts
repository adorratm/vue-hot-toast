// Vue 2/3 compatibility utilities

let vueVersion: 2 | 3 | null = null

export function isVue3(): boolean {
  if (vueVersion !== null) {
    return vueVersion === 3
  }
  
  try {
    // Try to detect Vue version
    // @ts-ignore
    if (typeof window !== 'undefined' && window.Vue) {
      // @ts-ignore
      const version = window.Vue.version
      vueVersion = version?.startsWith('3') ? 3 : 2
      return vueVersion === 3
    }
    
    // Try to require Vue
    try {
      const Vue = require('vue')
      const version = Vue.version || Vue.default?.version || '3.0.0'
      vueVersion = version.startsWith('3') ? 3 : 2
      return vueVersion === 3
    } catch {
      // Assume Vue 3 if can't detect
      vueVersion = 3
      return true
    }
  } catch {
    vueVersion = 3
    return true
  }
}

export function getVueVersion(): 2 | 3 {
  if (vueVersion !== null) {
    return vueVersion
  }
  
  isVue3() // This will set vueVersion
  return vueVersion || 3
}

// Reactive utilities for Vue 2/3 compatibility
export function createReactive<T>(value: T): { value: T } {
  if (isVue3()) {
    // Vue 3
    try {
      const { ref } = require('vue')
      return ref(value)
    } catch {
      // Fallback
      return { value }
    }
  } else {
    // Vue 2
    try {
      // @ts-ignore
      const Vue = require('vue').default || require('vue')
      return Vue.observable({ value })
    } catch {
      // Fallback
      return { value }
    }
  }
}

// Computed utilities
export function createComputed<T>(fn: () => T): { value: T } {
  if (isVue3()) {
    try {
      const { computed } = require('vue')
      return computed(fn)
    } catch {
      const reactive = createReactive(fn())
      return reactive
    }
  } else {
    // Vue 2 - simplified version
    const reactive = createReactive(fn())
    // Note: In Vue 2, you'd typically use computed properties in component options
    return reactive
  }
}
