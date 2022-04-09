import React from 'react'
import Head from 'next/head'
import SignInSide from '../components/sign-in-side'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Burnning Bush</title>
      </Head>

      <main>
        <SignInSide />
      </main>
    </div>
  )
}
