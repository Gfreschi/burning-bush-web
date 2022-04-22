import React from 'react'
import Head from 'next/head'
import { Dashboard } from '@material-ui/icons'
import PrivateRoute from '../context/auth/private_route'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Burnning Bush</title>
      </Head>

      <main>
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </main>
    </div>
  )
}
