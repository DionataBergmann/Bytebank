import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import { store } from '@/store'

export default function App({ Component, pageProps }: AppProps) {
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
