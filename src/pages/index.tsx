import React from 'react'
import Layout from '../components/Layout'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from 'src/components/Landing/Header'
import PlaceToVisit from 'src/components/Landing/PlaceToVisit'
import {
  Box,
  Grid,
  Typography,
  Divider,
  Paper,
  Link,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}))

function Main() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <PlaceToVisit />
    </div>
  )
}

export default Main
