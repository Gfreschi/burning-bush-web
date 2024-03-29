import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Head from 'next/head'
import TopBar from './TopBar'
import NavBar from './NavBar'
import { useAuthContext } from 'src/contexts/AuthContext'
import { CssBaseline } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fefefe',
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
}))

function Layout({ children, title }) {
  const classes = useStyles()
  const { isAuthenticated, user } = useAuthContext()

  return (
    <div>
      <CssBaseline />
      <Head>
        <title>{title}</title>
      </Head>
      <div className={classes.root}>
        <TopBar user={user} />
        <NavBar isAuthenticated={isAuthenticated} user={user} />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
