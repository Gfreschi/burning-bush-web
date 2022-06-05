import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { Box } from '@material-ui/core'
import Feed from '../components/Feed'

function Home({ data }) {
  // debug do contexto de autenticacao
  // useEffect(() => {
  //   api.get('/api/v1/users')
  // }, [])

  return (
    <main>
      <Layout title="Home">
        <Box p={2}>
          <Feed />
          <Link href="/sessions/sign_in">Sign In</Link>
          <br></br>
          <Link href="/sessions/sign_up">Sign Up</Link>
          <br></br>
          <Link href="/sessions/sign_out">Sign Out</Link>
          <br></br>
          <Link href="/complaints">Complaints</Link>
          <br></br>
          <Link href="/maps/preview">Mapa</Link>
        </Box>
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

export default Home
