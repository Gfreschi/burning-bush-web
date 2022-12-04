import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core'
import SortIcon from '@material-ui/icons/Sort'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Link as Scroll } from 'react-scroll'
import Typewriter from 'typewriter-effect'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Monospace',
  },
  appbar: {
    background: 'none',
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbarTitle: {
    flexGrow: '1',
  },
  colorText: {
    color: '#431e1b',
    fontSize: '4.5rem',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#317a36',
    fontSize: '4.5rem',
  },
  goDown: {
    color: '#431e1b',
    fontSize: '4rem',
  },
}))
export default function Header() {
  const classes = useStyles()
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    setChecked(true)
  }, [])

  return (
    <div className={classes.root} id="header">
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.colorText}>
            <Typewriter
              onInit={typewriter => {
                typewriter
                  .typeString('Bem vindo ao')
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString(
                    '<span style="color: #317a36;"> Burning </span> <span style="color: #431e1b;">Bush.</span>'
                  )
                  .pauseFor(3000)
                  .start()
              }}
            />
          </h1>
          <Scroll to="about" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  )
}
