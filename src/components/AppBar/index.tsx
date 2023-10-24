import * as React from 'react'
import Head from 'next/head'
import NavBar from './NavBar'

function AppBar({ children, title }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={classes.root}>
        <NavBar />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AppBar
