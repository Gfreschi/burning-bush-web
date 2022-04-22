import React from 'react'
import Head from 'next/head'
import PrivateRoute from '../context/auth/private_route'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Burnning Bush</title>
      </Head>

      <main>
        <Link href="/"> Home
        </Link>


        <br></br>


        <Link href="/sessions/login">
          <PrivateRoute />
        </Link>

        <Link href="/sessions/logout">
          <PrivateRoute />
        </Link>

      </main>
    </div>
  )
}
