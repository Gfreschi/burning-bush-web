import React from 'react'
import Head from 'next/head'
import ResponsiveAppBar from '../../../components/responsive-app-bar'


export default function Index(req, res) {
  res.status(200).json('Complaints')
  return (
    <div>
      <Head>
        <title>Complaints</title>
      </Head>

      <header>
      <ResponsiveAppBar />
      </header>
    </div>
  )
}
