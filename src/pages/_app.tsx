import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      preventDuplicate
    >
      <Component {...pageProps} />
    </SnackbarProvider>
  )
}
