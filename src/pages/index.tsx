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
    // <Layout title="Home">
    //   <Box p={5}>Mapa</Box>
    // </Layout>
    <main>
      <Layout title="Home">
        <Link href="/sessions/sign_in">Sign In</Link>
        <br></br>
        <Link href="/sessions/sign_up">Sign Up</Link>
        <br></br>
        <Link href="/sessions/sign_out">Sign Out</Link>
        <br></br>
        <Link href="/complaints">Complaints</Link>
        <br></br>
        <Link href="/maps/preview">Mapa</Link>
      </Layout>
    </main>
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
