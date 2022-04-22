import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import  GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
