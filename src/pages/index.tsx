import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { Box, Grid } from '@material-ui/core'
import Incident from '../components/Incident'
import DefaultCard from '../components/DefaultCard'

function Home({ data }) {
  // debug do contexto de autenticacao
  // useEffect(() => {
  //   api.get('/api/v1/users')
  // }, [])

  return (
    <main>
      <Layout title="Home">
        <Box p={2}>
          <Grid
            container
            spacing={4}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            {data.map((item: { id: React.Key }) => (
              <Grid item key={item.id} xl={3} lg={5} md={4} sm={6} xs={12}>
                <DefaultCard item={item} classes={undefined} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Layout>
    </main>
  )
}

export async function getStaticProps() {
  const data = [
    {
      id: '1',
      title: 'Título 1',
      severity: 'Severidade 1',
      kind: 'Tipo 1',
      details: 'Detalhes 1',
      createdAt: 'Criado em 1',
    },
    {
      id: '2',
      title: 'Título 2',
      severity: 'Severidade 2',
      kind: 'Tipo 2',
      details: 'Detalhes 2',
      createdAt: 'Criado em 2',
    },
    {
      id: '3',
      title: 'Título 3',
      severity: 'Severidade 3',
      kind: 'Tipo 3',
      details: 'Detalhes 3',
      createdAt: 'Criado em 3',
    },
    {
      id: '4',
      title: 'Título 4',
      severity: 'Severidade 4',
      kind: 'Tipo 4',
      details: 'Detalhes 4',
      createdAt: 'Criado em 4',
    },
    {
      id: '5',
      title: 'Título 5',
      severity: 'Severidade 5',
      kind: 'Tipo 5',
      details: 'Detalhes 5',
      createdAt: 'Criado em 5',
    },
    {
      id: '6',
      title: 'Título 6',
      severity: 'Severidade 6',
      kind: 'Tipo 6',
      details: 'Detalhes 6',
      createdAt: 'Criado em 6',
    },
  ]
  return {
    props: {
      data: data,
    },
  }
}

export default Home
