import React, { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {

  // debug do contexto de autenticacao
  // useEffect(() => {
  //   api.get('/api/v1/users')
  // }, [])

  return (
    <div>
      <Head>
        <title>Burnning Bush</title>
      </Head>

      <main>
        <h1>Welcome to Burning Bush</h1>
        <Link href="/">
        Home
        </Link>

        <br></br>

        <Link href="/sessions/login">
        Login
        </Link>

        <br></br>

        <Link href="/sessions/sign_up">
        Sign_up
        </Link>

        <br></br>

        <Link href="/complaints">
        Complaints
        </Link>
      </main>
    </div>
  )
}
