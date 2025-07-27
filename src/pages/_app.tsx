// src/pages/_app.tsx
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { useEffect } from 'react'
import { setTokenFromStorage } from '@/store/authSlice'

export default function App({ Component, pageProps }: AppProps) {
  const dispatch = store.dispatch

  useEffect(() => {
    dispatch(setTokenFromStorage())

    if (typeof window !== 'undefined') {
      import('@/single-spa-init')
    }
  }, [dispatch])

  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        preventDuplicate
      >
        <Component {...pageProps} />
      </SnackbarProvider>
    </Provider>
  )
}
