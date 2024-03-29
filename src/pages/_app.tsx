import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '../styles/createEmotionCache'
import theme from '../styles/theme'
import { AuthProvider } from '../contexts/AuthContext'
import { SnackbarProvider } from 'notistack'
import { IncidentsProvider } from 'src/contexts/IncidentsContext'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <React.StrictMode>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <IncidentsProvider>
                <Component {...pageProps} />
              </IncidentsProvider>
            </React.StrictMode>
          </ThemeProvider>
        </AuthProvider>
      </SnackbarProvider>
    </CacheProvider>
  )
}
