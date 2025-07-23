import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { useEffect } from 'react'
import { setTokenFromStorage } from '@/store/authSlice'

function AppInitializer() {
  const dispatch = store.dispatch

  useEffect(() => {
    dispatch(setTokenFromStorage())
  }, [dispatch])

  return null
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        preventDuplicate
      >
        <AppInitializer />
        <Component {...pageProps} />
      </SnackbarProvider>
    </Provider>
  )
}
