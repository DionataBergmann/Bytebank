if (typeof window !== 'undefined') {
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/systemjs@6.14.1/dist/system.min.js'

  script.onload = () => {
    const mfeUrl = process.env.NEXT_PUBLIC_MFE_INVESTMENTS_URL
    const importMap = document.createElement('script')
    importMap.type = 'systemjs-importmap'
    importMap.textContent = JSON.stringify({
      imports: {
        react: 'https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js',
        'react-dom': 'https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js',
       'bytebank-investments': mfeUrl
      },
    })
    document.head.appendChild(importMap)

    setTimeout(async () => {
      const { registerApplication, getAppNames, start } = await import('single-spa')

      if (!getAppNames().includes('bytebank-investments')) {
        registerApplication({
          name: 'bytebank-investments',
          app: () => (window as any).System.import('bytebank-investments'),
          activeWhen: (location) => location.pathname.startsWith('/investments'),
        })
      }

      start()
    }, 50)
  }

  document.body.appendChild(script)
}

export {}
