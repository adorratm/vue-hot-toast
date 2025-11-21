# Vue Hot Toast 🔥

Smoking hot Notifications for Vue.js and Nuxt.js

Lightweight, customizable and beautiful by default. Supports Vue 2/3 and Nuxt 2/3/4.

## Features

- 🔥 **Hot by default**
- 🔩 **Easily Customizable** - Themes, animations, icons, and more
- ⏳ **Promise API** - Automatic loader from a promise
- 🕊 **Lightweight** - Less than 5kb including styles
- ✅ **Accessible** - ARIA compliant
- 🎯 **Vue 2/3 & Nuxt 2/3/4 Support**
- 🎨 **Multiple Themes** - Light, dark, auto, and custom
- 🎬 **Animation System** - Slide, fade, scale, zoom, bounce, and custom
- 🔌 **Plugin System** - Extend functionality with plugins
- 🎭 **Icon Provider System** - Custom icon sets
- 🎪 **Action Buttons** - Add interactive buttons to toasts

## Installation

### With NPM

```bash
npm install @adorratm/vue-hot-toast
```

### With Yarn

```bash
yarn add @adorratm/vue-hot-toast
```

### With pnpm

```bash
pnpm add @adorratm/vue-hot-toast
```

## Getting Started

### Vue 3

```vue
<template>
  <div>
    <button @click="notify">Make me a toast</button>
    <Toaster />
  </div>
</template>

<script setup>
import Toaster from '@adorratm/vue-hot-toast/Toaster.vue'
import { toast } from '@adorratm/vue-hot-toast'

const notify = () => toast('Here is your toast.')
</script>
```

### Vue 2

```vue
<template>
  <div>
    <button @click="notify">Make me a toast</button>
    <Toaster />
  </div>
</template>

<script>
import Toaster from 'vue-hot-toast/Toaster.vue'
import { toast } from '@adorratm/vue-hot-toast'

export default {
  components: {
    Toaster,
  },
  methods: {
    notify() {
      toast('Here is your toast.')
    },
  },
}
</script>
```

### Vue Plugin (Vue 2/3)

```javascript
import { createApp } from 'vue' // or Vue from 'vue' for Vue 2
import App from './App.vue'
import VueHotToast from '@adorratm/vue-hot-toast/plugin'

const app = createApp(App)
app.use(VueHotToast, {
  duration: 4000,
  position: 'top-center',
  theme: 'light',
})

app.mount('#app')
```

### Nuxt 3

1. Install the package:

```bash
npm install vue-hot-toast
```

2. Add to `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@adorratm/vue-hot-toast/nuxt'],
  vueHotToast: {
    duration: 4000,
    position: 'top-center',
    theme: 'light',
  },
})
```

3. Add `Toaster` component to your `app.vue`:

```vue
<template>
  <div>
    <NuxtPage />
    <Toaster />
  </div>
</template>

<script setup>
import Toaster from 'vue-hot-toast/Toaster.vue'
</script>
```

4. Use it anywhere:

```vue
<script setup>
import { toast } from '@adorratm/vue-hot-toast'

const notify = () => toast('Here is your toast.')
</script>
```

### Nuxt 2

1. Install the package:

```bash
npm install vue-hot-toast
```

2. Add to `nuxt.config.js`:

```javascript
export default {
  modules: ['@adorratm/vue-hot-toast/nuxt2'],
  vueHotToast: {
    duration: 4000,
    position: 'top-center',
  },
}
```

3. Add `Toaster` component to your layout.

4. Use via `this.$toast()` in components.

### Nuxt 4

Same as Nuxt 3, but use `vue-hot-toast/nuxt4` module.

## API

### Basic Usage

```javascript
import { 
  toast, 
  successToast, 
  errorToast, 
  loadingToast,
  infoToast,
  warningToast 
} from '@adorratm/vue-hot-toast'

// Basic toast
toast('Hello World')

// Success toast
successToast('Successfully saved!')

// Error toast
errorToast('Something went wrong!')

// Info toast
infoToast('Here is some information')

// Warning toast
warningToast('Warning: Check this out')

// Loading toast
const loadingId = loadingToast('Loading...')
// Dismiss it later
dismissToast(loadingId)
```

### Promise API

```javascript
import { promiseToast } from '@adorratm/vue-hot-toast'

const saveData = async () => {
  return promiseToast(
    fetch('/api/save').then(res => res.json()),
    {
      loading: 'Saving...',
      success: (data) => `Saved: ${data.name}`,
      error: (err) => `Error: ${err.message}`
    }
  )
}
```

### Advanced Customization

```javascript
import { toast } from '@adorratm/vue-hot-toast'

toast('Custom toast', {
  duration: 5000,
  position: 'bottom-right',
  theme: 'dark',
  animation: 'bounce',
  style: {
    background: '#363636',
    color: '#fff',
  },
  className: 'my-toast',
  icon: '👋',
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo clicked'),
    style: { background: '#10b981' }
  },
  richColors: true,
  closeButton: true,
})
```

### Global Configuration

```javascript
import { setConfig } from '@adorratm/vue-hot-toast'

setConfig({
  duration: 5000,
  position: 'top-right',
  theme: 'dark',
  animation: 'fade',
  gutter: 16,
  maxToasts: 10,
  richColors: true,
  closeButton: true,
})
```

### Themes

```javascript
import { setThemeColors } from '@adorratm/vue-hot-toast'

// Customize theme colors
setThemeColors('light', {
  success: '#10b981',
  error: '#ef4444',
  background: '#ffffff',
  text: '#363636',
})

// Or create a custom theme
setThemeColors('custom', {
  success: '#00ff00',
  error: '#ff0000',
  background: '#000000',
  text: '#ffffff',
})
```

### Icon Provider

```javascript
import { registerIconProvider } from '@adorratm/vue-hot-toast'

registerIconProvider('my-icons', {
  getIcon: (type) => {
    const icons = {
      success: '✓',
      error: '✗',
      loading: '⟳',
      info: 'ℹ',
      warning: '⚠',
    }
    return icons[type]
  },
})
```

### Plugin System

```javascript
import { registerPlugin } from '@adorratm/vue-hot-toast'

registerPlugin({
  name: 'my-plugin',
  install: (config) => {
    // Plugin logic
    console.log('Plugin installed', config)
  },
})
```

## Options

### Toast Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `duration` | `number` | `4000` | Duration in milliseconds. Set to `Infinity` to never dismiss |
| `position` | `string` | `'top-center'` | Position of the toast |
| `theme` | `'light' \| 'dark' \| 'auto' \| 'custom'` | `'light'` | Theme |
| `animation` | `'slide' \| 'fade' \| 'scale' \| 'zoom' \| 'bounce' \| 'none' \| 'custom'` | `'slide'` | Animation type |
| `icon` | `string \| Component` | - | Custom icon |
| `style` | `object` | - | Custom styles |
| `className` | `string` | - | Custom CSS class |
| `action` | `ToastAction` | - | Action button |
| `richColors` | `boolean` | `true` | Enable rich colors |
| `closeButton` | `boolean` | `true` | Show close button |
| `ariaProps` | `object` | - | Custom ARIA attributes |
| `id` | `string` | - | Custom toast ID |

### Positions

- `top-left`
- `top-center`
- `top-right`
- `bottom-left`
- `bottom-center`
- `bottom-right`

### Animations

- `slide` - Slide in/out
- `fade` - Fade in/out
- `scale` - Scale in/out
- `zoom` - Zoom in/out
- `bounce` - Bounce animation
- `none` - No animation
- `custom` - Custom animation (define your own CSS)

### Toaster Component Props

```vue
<Toaster
  position="top-center"
  reverse-order={false}
  gutter={8}
  theme="light"
  animation="slide"
  rich-colors={true}
  close-button={true}
  max-toasts={5}
  container-class-name="my-container"
  container-style={{ padding: '20px' }}
/>
```

## TypeScript Support

Full TypeScript support included:

```typescript
import type { 
  Toast, 
  ToastOptions, 
  ToastPosition, 
  ToastTheme,
  ToastAnimation 
} from '@adorratm/vue-hot-toast'
```

## Examples

### With Action Button

```javascript
toast('Item deleted', {
  action: {
    label: 'Undo',
    onClick: () => restoreItem(),
  },
})
```

### Custom Theme per Toast

```javascript
toast('Dark mode toast', {
  theme: 'dark',
  style: {
    background: '#1f2937',
    color: '#f9fafb',
  },
})
```

### Multiple Toasts

```javascript
// Show multiple toasts
toast('First toast', { position: 'top-left' })
toast('Second toast', { position: 'top-center' })
toast('Third toast', { position: 'top-right' })
```

## License

MIT
