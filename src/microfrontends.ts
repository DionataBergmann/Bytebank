import { registerApplication, getAppNames } from 'single-spa'

export const registerMicrofrontends = async () => {
  if (!(window as any).System) {
    await loadSystemJS()
  }

  const appName = 'bytebank-investments'

  if (!getAppNames().includes(appName)) {
    registerApplication({
      name: appName,
      app: () => (window as any).System.import('bytebank-investments'),
      activeWhen: (location) => location.pathname.startsWith('/investments'),
    })
  }
}

const loadSystemJS = () => {
  return new Promise<void>((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/systemjs@6.14.1/dist/system.min.js'
    script.onload = () => resolve()
    document.body.appendChild(script)
  })
}
