import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { Box } from '@material-ui/core'

export default function Home() {
  // debug do contexto de autenticacao
  // useEffect(() => {
  //   api.get('/api/v1/users')
  // }, [])

  return (
    <Layout title="Home">
      <Box p={5}>Mapa</Box>
    </Layout>
    // <div>
    //   <main>
    //     <Layout title="Burning Bush">
    //       <h1>Welcome to Burning Bush</h1>
    //       <Link href="/">Home</Link>

    //       <br></br>

    //       <Link href="/sessions/login">Login</Link>

    //       <br></br>

    //       <Link href="/sessions/sign_up">Sign_up</Link>

    //       <br></br>

    //       <Link href="/complaints">Complaints</Link>
    //     </Layout>
    //   </main>
    // </div>
  )
}

export async function getStaticProps() {
  const data = []
  return {
    props: {
      data: [],
    },
  }
}
