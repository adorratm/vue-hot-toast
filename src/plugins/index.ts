import type { ToastPlugin, IconProvider } from '../types'

const plugins: Map<string, ToastPlugin> = new Map()
const iconProviders: Map<string, IconProvider> = new Map()

export function registerPlugin(plugin: ToastPlugin) {
  plugins.set(plugin.name, plugin)
}

export function unregisterPlugin(name: string) {
  plugins.delete(name)
}

export function getPlugin(name: string): ToastPlugin | undefined {
  return plugins.get(name)
}

export function registerIconProvider(name: string, provider: IconProvider) {
  iconProviders.set(name, provider)
}

export function getIconProvider(name?: string): IconProvider | undefined {
  if (!name) {
    return iconProviders.values().next().value
  }
  return iconProviders.get(name)
}

export function getAllPlugins(): ToastPlugin[] {
  return Array.from(plugins.values())
}

