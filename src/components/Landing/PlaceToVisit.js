import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ImageCard from './ImageCard'
import places from 'src/static/places'
import useWindowPosition from 'src/hooks/useWindowPosition'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/router'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  button: {
    color: '#fff',
    backgroundColor: '#317a36',
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
}))
export default function PlacesToVisit() {
  const classes = useStyles()
  const checked = useWindowPosition('header')
  const router = useRouter()
  return (
    <>
      <div className={classes.root} id="about">
        <ImageCard place={places[1]} checked={checked} />
        <ImageCard place={places[0]} checked={checked} />
      </div>
      <div className={classes.button}>
        <Fab
          aria-label="add"
          onClick={() => {
            router.push('/maps/preview')
          }}
        >
          <AddIcon />
        </Fab>
      </div>
    </>
  )
}
