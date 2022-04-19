import React from 'react'
import Head from 'next/head'
import SignInSide from '../components/sign-in-side'
import ResponsiveAppBar from '../components/responsive-app-bar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Burnning Bush</title>
      </Head>

      <main>
        <ResponsiveAppBar />
      </main>
    </div>
  )
}
